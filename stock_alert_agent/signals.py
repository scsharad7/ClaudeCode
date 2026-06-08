"""
Signal detection for stock spike alerts.
Scans tickers for pre-spike indicators and returns scored StockAlert objects.

Signals:
  1. PRE_MARKET_SURGE      – Up >5% in pre-market with elevated volume
  2. UNUSUAL_VOLUME        – Volume already 3x+ the 20-day avg (time-projected)
  3. GAP_UP                – Opening gap above previous close
  4. 52W_HIGH_BREAKOUT     – Near/above 52-week high with volume confirmation
  5. SHORT_SQUEEZE_SETUP   – High days-to-cover + short float
  6. NEWS_CATALYST         – Recent bullish news within 24h
  7. EARNINGS_BEAT         – Pre-market/intraday gain around earnings date
  8. OPTIONS_FLOW_SIGNAL   – IV spike proxy via realized-vol acceleration + beta
"""

from __future__ import annotations

import logging
from concurrent.futures import ThreadPoolExecutor, as_completed
from dataclasses import dataclass, field
from datetime import datetime, time, timedelta
from typing import Optional

import numpy as np
import pandas as pd
import pytz
import yfinance as yf

from config import WATCHLIST_TICKERS, config

logger = logging.getLogger(__name__)

ET = pytz.timezone("America/New_York")


# ---------------------------------------------------------------------------
# Data models
# ---------------------------------------------------------------------------

@dataclass
class StockAlert:
    ticker: str
    current_price: float
    prev_close: float
    signals_triggered: list[str]
    signal_details: dict
    spike_probability_score: int        # 0-100
    estimated_upside_pct: float
    buy_window: str = "intraday"
    market_cap: Optional[float] = None
    news_headline: Optional[str] = None
    scanned_at: datetime = field(default_factory=lambda: datetime.now(ET))

    @property
    def change_pct(self) -> float:
        if self.prev_close and self.prev_close > 0:
            return (self.current_price - self.prev_close) / self.prev_close * 100
        return 0.0

    def __str__(self) -> str:
        return (
            f"{self.ticker} @ ${self.current_price:.2f} "
            f"({self.change_pct:+.1f}%) "
            f"score={self.spike_probability_score} "
            f"signals={self.signals_triggered}"
        )


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _get_et_time() -> datetime:
    return datetime.now(ET)


def _safe_float(val, default: float = 0.0) -> float:
    try:
        v = float(val)
        return v if np.isfinite(v) else default
    except (TypeError, ValueError):
        return default


def _pct_change(new_val: float, old_val: float) -> float:
    if old_val == 0:
        return 0.0
    return (new_val - old_val) / old_val * 100.0


def _elapsed_session_minutes(now_et: Optional[datetime] = None) -> float:
    """Minutes elapsed since 9:30 AM ET today (returns 0 if before open)."""
    if now_et is None:
        now_et = _get_et_time()
    session_start = ET.localize(datetime.combine(now_et.date(), time(9, 30)))
    delta = (now_et - session_start).total_seconds() / 60.0
    return max(0.0, delta)


# ---------------------------------------------------------------------------
# Signal 1: Pre-market surge
# ---------------------------------------------------------------------------

def _check_premarket_surge(info: dict, hist: pd.DataFrame) -> tuple[bool, dict]:
    """
    Returns (triggered, details).
    Uses preMarketPrice / preMarketChangePercent from info dict first,
    falls back to intraday change vs previous close.
    """
    details: dict = {}
    threshold = config.thresholds.premarket_move_pct

    premarket_price = _safe_float(info.get("preMarketPrice"))
    premarket_change_raw = _safe_float(info.get("preMarketChangePercent"))

    if premarket_price > 0 and premarket_change_raw != 0:
        # yfinance may return as decimal (0.08) or percent (8.0) — normalise
        if abs(premarket_change_raw) < 2.0:
            premarket_pct = premarket_change_raw * 100
        else:
            premarket_pct = premarket_change_raw
    else:
        # No pre-market data — use current vs prev close as proxy
        current = _safe_float(info.get("currentPrice") or info.get("regularMarketPrice"))
        prev_close = _safe_float(info.get("previousClose") or info.get("regularMarketPreviousClose"))
        if prev_close > 0 and current > 0:
            premarket_pct = _pct_change(current, prev_close)
        else:
            if len(hist) >= 2:
                premarket_pct = _pct_change(
                    _safe_float(hist["Close"].iloc[-1]),
                    _safe_float(hist["Close"].iloc[-2])
                )
            else:
                return False, {}

    details["premarket_pct"] = round(premarket_pct, 2)

    # Volume confirmation: pre-market volume vs expected (~5% of daily avg)
    pm_vol = _safe_float(info.get("preMarketVolume"))
    avg_vol = _safe_float(info.get("averageVolume") or info.get("averageDailyVolume10Day"))
    if avg_vol > 0 and pm_vol > 0:
        expected_pm_vol = avg_vol * 0.05
        pm_vol_ratio = pm_vol / expected_pm_vol
        details["pm_vol_ratio"] = round(pm_vol_ratio, 2)

    triggered = premarket_pct >= threshold
    return triggered, details


# ---------------------------------------------------------------------------
# Signal 2: Unusual volume
# ---------------------------------------------------------------------------

def _check_unusual_volume(info: dict, hist: pd.DataFrame) -> tuple[bool, dict]:
    """
    Time-projects today's volume to end-of-day and compares to 20-day average.
    """
    details: dict = {}
    multiplier = config.thresholds.unusual_volume_multiplier

    if len(hist) < 5:
        return False, {}

    avg_vol_20 = _safe_float(hist["Volume"].iloc[:-1].tail(20).mean())
    if avg_vol_20 == 0:
        return False, {}

    today_vol = _safe_float(
        info.get("volume") or info.get("regularMarketVolume") or hist["Volume"].iloc[-1]
    )

    # Project to full day based on time elapsed in session
    elapsed = _elapsed_session_minutes()
    if elapsed > 5:
        # Linear projection
        projected_vol = today_vol * (390.0 / elapsed)
    else:
        projected_vol = today_vol  # too early to project; use raw

    vol_ratio_actual = today_vol / avg_vol_20
    vol_ratio_projected = projected_vol / avg_vol_20

    # Use the better of actual vs projected, but don't over-weight very early bars
    if elapsed < 15:
        effective_ratio = vol_ratio_actual
    else:
        # Weight: 40% actual + 60% projected (projected gives early warning)
        effective_ratio = 0.4 * vol_ratio_actual + 0.6 * vol_ratio_projected

    details["volume_ratio"] = round(effective_ratio, 2)
    details["today_vol"] = int(today_vol)
    details["avg_vol_20d"] = int(avg_vol_20)
    details["projected_vol"] = int(projected_vol)

    triggered = effective_ratio >= multiplier
    return triggered, details


# ---------------------------------------------------------------------------
# Signal 3: Gap up at open
# ---------------------------------------------------------------------------

def _check_gap_up(info: dict, hist: pd.DataFrame) -> tuple[bool, dict]:
    """Detects a significant opening gap vs previous close."""
    details: dict = {}
    threshold = config.thresholds.gap_up_pct

    prev_close = _safe_float(
        info.get("previousClose") or info.get("regularMarketPreviousClose")
    )
    open_price = _safe_float(info.get("open") or info.get("regularMarketOpen"))

    if prev_close <= 0:
        if len(hist) >= 2:
            prev_close = _safe_float(hist["Close"].iloc[-2])
        else:
            return False, {}

    if open_price <= 0 and len(hist) >= 1:
        open_price = _safe_float(hist["Open"].iloc[-1])

    if prev_close <= 0 or open_price <= 0:
        return False, {}

    gap_pct = _pct_change(open_price, prev_close)
    details["gap_pct"] = round(gap_pct, 2)
    details["prev_close"] = round(prev_close, 2)
    details["open_price"] = round(open_price, 2)

    triggered = gap_pct >= threshold
    return triggered, details


# ---------------------------------------------------------------------------
# Signal 4: 52-week high breakout
# ---------------------------------------------------------------------------

def _check_52w_breakout(info: dict, hist: pd.DataFrame) -> tuple[bool, dict]:
    """Price near or above 52-week high with volume confirmation."""
    details: dict = {}
    nearness = config.thresholds.breakout_nearness_pct

    week52_high = _safe_float(info.get("fiftyTwoWeekHigh"))
    current = _safe_float(
        info.get("currentPrice") or info.get("regularMarketPrice")
    )

    if week52_high <= 0 and len(hist) >= 30:
        week52_high = float(hist["High"].tail(252).max())
    if current <= 0 and len(hist) >= 1:
        current = _safe_float(hist["Close"].iloc[-1])

    if week52_high <= 0 or current <= 0:
        return False, {}

    pct_from_high = ((week52_high - current) / week52_high) * 100
    details["pct_from_52w_high"] = round(pct_from_high, 2)
    details["week52_high"] = round(week52_high, 2)

    # Volume confirmation
    avg_vol_20 = 0.0
    vol_ratio = 1.0
    if len(hist) >= 21:
        avg_vol_20 = float(hist["Volume"].iloc[:-1].tail(20).mean())
        today_vol = _safe_float(
            info.get("volume") or info.get("regularMarketVolume") or hist["Volume"].iloc[-1]
        )
        if avg_vol_20 > 0:
            vol_ratio = today_vol / avg_vol_20
            details["vol_ratio_for_breakout"] = round(vol_ratio, 2)

    # Need price within nearness% AND volume surge
    triggered = pct_from_high <= nearness and vol_ratio >= 1.5
    return triggered, details


# ---------------------------------------------------------------------------
# Signal 5: Short squeeze setup
# ---------------------------------------------------------------------------

def _check_short_squeeze(info: dict) -> tuple[bool, dict]:
    """High short interest + days-to-cover, combined with another signal acting as catalyst."""
    details: dict = {}
    dtc_threshold = config.thresholds.short_squeeze_dtc_threshold

    short_pct_float = _safe_float(info.get("shortPercentOfFloat", 0)) * 100
    shares_short = _safe_float(info.get("sharesShort", 0))
    avg_vol = _safe_float(info.get("averageVolume", 0))
    short_ratio = _safe_float(info.get("shortRatio", 0))   # yfinance "days to cover" field

    # Compute days-to-cover ourselves if shortRatio not available
    if short_ratio == 0 and shares_short > 0 and avg_vol > 0:
        short_ratio = shares_short / avg_vol

    details["short_pct_float"] = round(short_pct_float, 2)
    details["days_to_cover"] = round(short_ratio, 2)

    triggered = short_pct_float >= 15.0 or short_ratio >= dtc_threshold
    return triggered, details


# ---------------------------------------------------------------------------
# Signal 6: News catalyst
# ---------------------------------------------------------------------------

def _check_news_catalyst(ticker_obj: yf.Ticker) -> tuple[bool, dict, Optional[str]]:
    """Recent bullish news within 24h. Returns (triggered, details, headline)."""
    details: dict = {}
    headline = None

    try:
        news = ticker_obj.news
        if not news:
            return False, {}, None

        cutoff_ts = datetime.now().timestamp() - 86400
        recent = [n for n in news if _safe_float(n.get("providerPublishTime", 0)) >= cutoff_ts]

        bullish_keywords = [
            "beat", "surges", "jumps", "rally", "upgrade", "buy", "outperform",
            "record", "acquisition", "merger", "deal", "contract", "patent",
            "approval", "fda", "earnings", "profit", "revenue", "guidance",
            "partnership", "breakthrough", "positive", "strong",
        ]

        keyword_hits = 0
        for article in recent:
            title = article.get("title", "").lower()
            if any(k in title for k in bullish_keywords):
                keyword_hits += 1
                if headline is None:
                    headline = article.get("title", "")

        details["recent_articles_24h"] = len(recent)
        details["catalyst_keyword_hits"] = keyword_hits
        if headline:
            details["news_headline"] = headline[:120]
            details["news_age_hours"] = round(
                (datetime.now().timestamp() - _safe_float(news[0].get("providerPublishTime", 0))) / 3600, 1
            )

        triggered = len(recent) >= 2 or keyword_hits >= 1
        return triggered, details, headline

    except Exception as exc:
        logger.debug("News check error: %s", exc)
        return False, {}, None


# ---------------------------------------------------------------------------
# Signal 7: Earnings beat
# ---------------------------------------------------------------------------

def _check_earnings_beat(info: dict, hist: pd.DataFrame) -> tuple[bool, dict]:
    """
    Large move on/around earnings date.
    yfinance exposes earningsTimestamp* fields in the info dict.
    """
    details: dict = {}

    now_ts = datetime.now().timestamp()
    # Try multiple timestamp keys
    earnings_ts = max(
        _safe_float(info.get("earningsTimestamp", 0)),
        _safe_float(info.get("earningsTimestampStart", 0)),
        _safe_float(info.get("earningsTimestampEnd", 0)),
    )

    if earnings_ts == 0:
        return False, {}

    days_since = (now_ts - earnings_ts) / 86400.0
    details["days_since_earnings"] = round(days_since, 1)

    # Only trigger within 1 calendar day of earnings release
    if not (-0.5 <= days_since <= 1.5):
        return False, {}

    prev_close = _safe_float(
        info.get("previousClose") or info.get("regularMarketPreviousClose")
    )
    current = _safe_float(info.get("currentPrice") or info.get("regularMarketPrice"))
    if prev_close <= 0 or current <= 0:
        if len(hist) >= 2:
            prev_close = _safe_float(hist["Close"].iloc[-2])
            current = _safe_float(hist["Close"].iloc[-1])
        else:
            return False, {}

    change_pct = _pct_change(current, prev_close)
    details["earnings_day_change_pct"] = round(change_pct, 2)

    triggered = change_pct >= 3.0  # stock up 3%+ on earnings
    return triggered, details


# ---------------------------------------------------------------------------
# Signal 8: Options flow / IV spike proxy
# ---------------------------------------------------------------------------

def _check_options_flow(
    ticker_obj: yf.Ticker, info: dict, hist: pd.DataFrame
) -> tuple[bool, dict]:
    """
    Uses realized-volatility acceleration and beta as an IV spike proxy.
    When recent 5-day vol is 1.5x+ the 30-day vol AND beta is high,
    the market is likely pricing in a big move.

    Also tries to fetch real front-month ATM implied volatility from yfinance options.
    """
    details: dict = {}
    multiplier = config.thresholds.iv_spike_multiplier
    beta = _safe_float(info.get("beta", 1.0), default=1.0)
    details["beta"] = round(beta, 2)

    # Primary: try to fetch real options IV using the already-instantiated ticker object
    try:
        exps = ticker_obj.options
        if exps:
            chain = ticker_obj.option_chain(exps[0])
            calls = chain.calls
            if not calls.empty and "impliedVolatility" in calls.columns:
                current_price = _safe_float(
                    info.get("currentPrice") or info.get("regularMarketPrice")
                )
                if current_price > 0:
                    atm_mask = (
                        (calls["strike"] >= current_price * 0.95) &
                        (calls["strike"] <= current_price * 1.05)
                    )
                    atm = calls[atm_mask]
                else:
                    atm = calls

                if not atm.empty:
                    avg_iv = float(atm["impliedVolatility"].dropna().mean())
                    details["avg_atm_iv_pct"] = round(avg_iv * 100, 1)
                    details["options_source"] = "live"
                    # IV > 100% annualized (1.0 in decimal) is extremely elevated
                    if avg_iv >= 1.0:
                        return True, details
    except Exception:
        pass  # Fall through to proxy method

    # Fallback: realized-volatility proxy
    if len(hist) < 10:
        return False, {}

    returns = hist["Close"].pct_change().dropna()
    vol_5d = float(returns.tail(5).std()) * 100
    vol_30d = float(returns.tail(30).std()) * 100 if len(returns) >= 30 else vol_5d

    if vol_30d == 0:
        return False, {}

    vol_spike_ratio = vol_5d / vol_30d
    details["vol_spike_ratio"] = round(vol_spike_ratio, 2)
    details["vol_5d_pct"] = round(vol_5d, 3)
    details["vol_30d_pct"] = round(vol_30d, 3)
    details["options_source"] = "proxy"

    triggered = vol_spike_ratio >= multiplier and beta > 1.5
    return triggered, details


# ---------------------------------------------------------------------------
# Scoring
# ---------------------------------------------------------------------------

# Max points each signal can contribute; total sums to > 100 (hard-capped at 100)
SIGNAL_SCORES: dict[str, int] = {
    "PRE_MARKET_SURGE":     30,
    "UNUSUAL_VOLUME":       20,
    "GAP_UP":               20,
    "52W_HIGH_BREAKOUT":    15,
    "SHORT_SQUEEZE_SETUP":  20,
    "NEWS_CATALYST":        15,
    "EARNINGS_BEAT":        25,
    "OPTIONS_FLOW_SIGNAL":  10,
}


def _compute_score(
    signals: list[str],
    details: dict,
    premarket_pct: float,
    vol_ratio: float,
    gap_pct: float,
) -> int:
    """
    Build a 0-100 spike probability score with partial credit per signal.
    """
    score = 0

    if "PRE_MARKET_SURGE" in signals:
        # Scale: 2% → 10 pts, 5% → 20 pts, 10%+ → 30 pts (max)
        score += min(SIGNAL_SCORES["PRE_MARKET_SURGE"], int(premarket_pct * 3.0))

    if "UNUSUAL_VOLUME" in signals:
        ratio = details.get("volume_ratio", vol_ratio)
        # 2x → 10 pts, 4x → 20 pts
        score += min(SIGNAL_SCORES["UNUSUAL_VOLUME"], int(ratio * 5.0))

    if "GAP_UP" in signals:
        gap = details.get("gap_pct", gap_pct)
        # 2% → 8 pts, 5% → 20 pts
        score += min(SIGNAL_SCORES["GAP_UP"], int(abs(gap) * 4))

    if "52W_HIGH_BREAKOUT" in signals:
        score += SIGNAL_SCORES["52W_HIGH_BREAKOUT"]

    if "SHORT_SQUEEZE_SETUP" in signals:
        dtc = details.get("days_to_cover", 0)
        short_pct = details.get("short_pct_float", 0)
        score += min(SIGNAL_SCORES["SHORT_SQUEEZE_SETUP"], int(dtc * 2.0 + short_pct * 0.5))

    if "NEWS_CATALYST" in signals:
        hits = details.get("catalyst_keyword_hits", 1)
        score += min(SIGNAL_SCORES["NEWS_CATALYST"], 8 + hits * 7)

    if "EARNINGS_BEAT" in signals:
        ep = abs(details.get("earnings_day_change_pct", 5.0))
        # 2% → 5 pts, 5% → 15 pts, 15%+ → 25 pts
        score += min(SIGNAL_SCORES["EARNINGS_BEAT"], int(ep * 1.8))

    if "OPTIONS_FLOW_SIGNAL" in signals:
        score += SIGNAL_SCORES["OPTIONS_FLOW_SIGNAL"]

    return min(score, 100)


def _estimate_upside(
    signals: list[str], premarket_pct: float, gap_pct: float, details: dict
) -> float:
    """Heuristic upside estimate – NOT a financial forecast."""
    base = max(abs(premarket_pct), abs(gap_pct), 2.0)
    multiplier = 1.0 + (len(signals) - 1) * 0.25  # each extra signal adds 25%

    if "EARNINGS_BEAT" in signals:
        ep = abs(details.get("earnings_day_change_pct", base))
        base = max(base, ep)
        multiplier += 0.5

    if "SHORT_SQUEEZE_SETUP" in signals:
        multiplier += 0.7

    if "PRE_MARKET_SURGE" in signals:
        multiplier += 0.4

    estimated = base * multiplier * 1.2
    return min(round(estimated, 1), 75.0)


def _determine_buy_window(signals: list[str]) -> str:
    if "PRE_MARKET_SURGE" in signals or "EARNINGS_BEAT" in signals:
        return "pre-market (4–9:30 AM ET)"
    if "GAP_UP" in signals:
        return "market open (9:30–10:15 AM ET)"
    if "52W_HIGH_BREAKOUT" in signals:
        return "intraday breakout watch"
    if "SHORT_SQUEEZE_SETUP" in signals:
        return "intraday – momentum trigger needed"
    return "intraday"


# ---------------------------------------------------------------------------
# Per-ticker analysis
# ---------------------------------------------------------------------------

def _analyze_ticker(ticker: str) -> Optional[StockAlert]:
    """Run all signal checks for a single ticker. Returns None on failure or no signals."""
    try:
        t = yf.Ticker(ticker)
        info = t.info or {}

        current_price = _safe_float(
            info.get("currentPrice") or info.get("regularMarketPrice") or info.get("ask")
        )
        prev_close = _safe_float(
            info.get("previousClose") or info.get("regularMarketPreviousClose")
        )

        if current_price <= 0 or prev_close <= 0:
            return None

        # Fetch 30-day daily history (used by multiple signals)
        hist = t.history(period="30d", auto_adjust=True)
        if hist.empty or len(hist) < 5:
            return None

        # ---- Run all signals ------------------------------------------------
        signals: list[str] = []
        all_details: dict = {}

        # Signal 1: Pre-market surge
        triggered1, d1 = _check_premarket_surge(info, hist)
        if triggered1:
            signals.append("PRE_MARKET_SURGE")
        all_details.update(d1)

        # Signal 2: Unusual volume
        triggered2, d2 = _check_unusual_volume(info, hist)
        if triggered2:
            signals.append("UNUSUAL_VOLUME")
        all_details.update(d2)

        # Signal 3: Gap up
        triggered3, d3 = _check_gap_up(info, hist)
        if triggered3:
            signals.append("GAP_UP")
        all_details.update(d3)

        # Signal 4: 52-week high breakout
        triggered4, d4 = _check_52w_breakout(info, hist)
        if triggered4:
            signals.append("52W_HIGH_BREAKOUT")
        all_details.update(d4)

        # Signal 5: Short squeeze (requires at least one other signal as catalyst)
        triggered5, d5 = _check_short_squeeze(info)
        all_details.update(d5)
        if triggered5 and len(signals) >= 1:
            signals.append("SHORT_SQUEEZE_SETUP")

        # Signal 6: News catalyst
        triggered6, d6, headline = _check_news_catalyst(t)
        if triggered6:
            signals.append("NEWS_CATALYST")
        all_details.update(d6)

        # Signal 7: Earnings beat
        triggered7, d7 = _check_earnings_beat(info, hist)
        if triggered7:
            signals.append("EARNINGS_BEAT")
        all_details.update(d7)

        # Signal 8: Options flow / IV proxy
        triggered8, d8 = _check_options_flow(t, info, hist)
        if triggered8:
            signals.append("OPTIONS_FLOW_SIGNAL")
        all_details.update(d8)

        # No signals → skip
        if not signals:
            return None

        # ---- Score -----------------------------------------------------------
        premarket_pct = _safe_float(all_details.get("premarket_pct"))
        vol_ratio = _safe_float(all_details.get("volume_ratio", 1.0))
        gap_pct = _safe_float(all_details.get("gap_pct"))

        score = _compute_score(signals, all_details, premarket_pct, vol_ratio, gap_pct)
        upside = _estimate_upside(signals, premarket_pct, gap_pct, all_details)
        buy_window = _determine_buy_window(signals)

        # Only surface alerts that clear the minimum threshold
        if score < config.thresholds.min_score_for_alert:
            return None

        return StockAlert(
            ticker=ticker,
            current_price=current_price,
            prev_close=prev_close,
            signals_triggered=signals,
            signal_details=all_details,
            spike_probability_score=score,
            estimated_upside_pct=upside,
            buy_window=buy_window,
            market_cap=_safe_float(info.get("marketCap")),
            news_headline=headline,
        )

    except Exception as exc:
        logger.debug("Failed to analyze %s: %s", ticker, exc)
        return None


# ---------------------------------------------------------------------------
# Market scanner
# ---------------------------------------------------------------------------

def scan_market(tickers: list[str] | None = None) -> list[StockAlert]:
    """
    Concurrently scan the watchlist for spike signals.

    Args:
        tickers: Override the default WATCHLIST_TICKERS list.

    Returns:
        List of StockAlert objects sorted by spike_probability_score descending.
    """
    if tickers is None:
        tickers = WATCHLIST_TICKERS

    now_et = _get_et_time()
    logger.info(
        "Starting market scan at %s ET for %d tickers (%d workers)",
        now_et.strftime("%H:%M:%S"),
        len(tickers),
        config.scan.premarket_scan_interval_minutes,  # reused as worker hint
    )

    max_workers = min(30, len(tickers))
    alerts: list[StockAlert] = []

    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = {executor.submit(_analyze_ticker, sym): sym for sym in tickers}
        completed = 0
        for future in as_completed(futures):
            sym = futures[future]
            completed += 1
            if completed % 25 == 0:
                logger.info("  Scanned %d/%d tickers, %d alerts so far…", completed, len(tickers), len(alerts))
            try:
                result = future.result(timeout=45)
                if result is not None:
                    alerts.append(result)
                    logger.info("  ALERT: %s", result)
            except Exception as exc:
                logger.debug("Future failed for %s: %s", sym, exc)

    alerts.sort(key=lambda a: a.spike_probability_score, reverse=True)
    logger.info("Scan complete: %d/%d tickers generated alerts", len(alerts), len(tickers))
    return alerts
