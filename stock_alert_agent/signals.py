"""
Signal detection for stock spike alerts.
Scans tickers for pre-spike indicators and returns scored StockAlert objects.
"""

from __future__ import annotations

import logging
from dataclasses import dataclass, field
from datetime import datetime, time
from typing import Optional

import numpy as np
import pandas as pd
import pytz
import yfinance as yf

from config import WATCHLIST_TICKERS, config

logger = logging.getLogger(__name__)

ET = pytz.timezone("America/New_York")


@dataclass
class StockAlert:
    ticker: str
    current_price: float
    prev_close: float
    signals_triggered: list[str]
    signal_details: dict
    spike_probability_score: int  # 0-100
    estimated_upside_pct: float
    market_cap: Optional[float] = None
    news_headline: Optional[str] = None

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


def _get_et_time() -> datetime:
    return datetime.now(ET)


def _safe_float(val, default: float = 0.0) -> float:
    try:
        v = float(val)
        return v if np.isfinite(v) else default
    except (TypeError, ValueError):
        return default


def _analyze_ticker(ticker: str) -> Optional[StockAlert]:
    """Run all signal checks for a single ticker. Returns None on failure."""
    try:
        t = yf.Ticker(ticker)
        info = t.info or {}

        current_price = _safe_float(
            info.get("currentPrice") or info.get("regularMarketPrice") or info.get("ask")
        )
        prev_close = _safe_float(info.get("previousClose") or info.get("regularMarketPreviousClose"))

        if current_price <= 0 or prev_close <= 0:
            return None

        # Fetch 30 days of daily history for volume baseline
        hist = t.history(period="30d", auto_adjust=True)
        if hist.empty or len(hist) < 5:
            return None

        signals: list[str] = []
        details: dict = {}
        score = 0

        # ------------------------------------------------------------------
        # Signal 1: Pre-market / extended-hours move
        # ------------------------------------------------------------------
        premarket_price = _safe_float(info.get("preMarketPrice"))
        premarket_change = _safe_float(info.get("preMarketChangePercent"))
        if premarket_price > 0 and abs(premarket_change) > 0:
            premarket_pct = premarket_change * 100 if abs(premarket_change) < 1 else premarket_change
        else:
            premarket_pct = (current_price - prev_close) / prev_close * 100

        threshold = config.thresholds.premarket_move_pct
        if premarket_pct >= threshold:
            signals.append("PRE_MARKET_SURGE")
            details["premarket_pct"] = round(premarket_pct, 2)
            score += min(30, int(premarket_pct * 2))  # up to 30 pts

        # ------------------------------------------------------------------
        # Signal 2: Unusual volume
        # ------------------------------------------------------------------
        avg_vol_20 = hist["Volume"].iloc[:-1].tail(20).mean()
        today_vol = _safe_float(info.get("volume") or info.get("regularMarketVolume"))
        vol_ratio = today_vol / avg_vol_20 if avg_vol_20 > 0 else 0

        if vol_ratio >= config.thresholds.unusual_volume_multiplier:
            signals.append("UNUSUAL_VOLUME")
            details["volume_ratio"] = round(vol_ratio, 2)
            score += min(20, int(vol_ratio * 3))  # up to 20 pts

        # ------------------------------------------------------------------
        # Signal 3: Gap-up at open
        # ------------------------------------------------------------------
        open_price = _safe_float(info.get("open") or info.get("regularMarketOpen"))
        if open_price > 0 and prev_close > 0:
            gap_pct = (open_price - prev_close) / prev_close * 100
            if gap_pct >= config.thresholds.gap_up_pct:
                signals.append("GAP_UP")
                details["gap_pct"] = round(gap_pct, 2)
                score += min(20, int(gap_pct * 2))  # up to 20 pts

        # ------------------------------------------------------------------
        # Signal 4: 52-week high breakout
        # ------------------------------------------------------------------
        week52_high = _safe_float(info.get("fiftyTwoWeekHigh"))
        if week52_high > 0 and current_price > 0:
            pct_from_high = (week52_high - current_price) / week52_high * 100
            if pct_from_high <= config.thresholds.breakout_nearness_pct:
                signals.append("52W_HIGH_BREAKOUT")
                details["pct_from_52w_high"] = round(pct_from_high, 2)
                score += 15

        # ------------------------------------------------------------------
        # Signal 5: Short squeeze setup
        # ------------------------------------------------------------------
        short_pct = _safe_float(info.get("shortPercentOfFloat", 0)) * 100
        shares_short = _safe_float(info.get("sharesShort", 0))
        avg_daily_vol = _safe_float(info.get("averageVolume", avg_vol_20))
        days_to_cover = shares_short / avg_daily_vol if avg_daily_vol > 0 else 0

        if (
            short_pct >= 15
            and days_to_cover >= config.thresholds.short_squeeze_dtc_threshold
            and len(signals) >= 1  # needs another catalyst too
        ):
            signals.append("SHORT_SQUEEZE_SETUP")
            details["short_pct_float"] = round(short_pct, 2)
            details["days_to_cover"] = round(days_to_cover, 2)
            score += 20

        # ------------------------------------------------------------------
        # Signal 6: Implied-volatility / options activity proxy
        # Use beta + recent price volatility as a proxy when IV isn't available
        # ------------------------------------------------------------------
        beta = _safe_float(info.get("beta", 1.0), default=1.0)
        if len(hist) >= 10:
            recent_returns = hist["Close"].pct_change().dropna().tail(10)
            recent_vol = recent_returns.std() * 100
            hist_avg_vol_std = hist["Close"].pct_change().dropna().std() * 100
            iv_proxy_ratio = recent_vol / hist_avg_vol_std if hist_avg_vol_std > 0 else 1.0

            if iv_proxy_ratio >= config.thresholds.iv_spike_multiplier and beta > 1.5:
                signals.append("OPTIONS_FLOW_SIGNAL")
                details["vol_spike_ratio"] = round(iv_proxy_ratio, 2)
                details["beta"] = round(beta, 2)
                score += 10

        # ------------------------------------------------------------------
        # Signal 7: News catalyst
        # ------------------------------------------------------------------
        try:
            news = t.news
            if news:
                latest = news[0]
                headline = latest.get("title", "")
                pub_time = latest.get("providerPublishTime", 0)
                now_ts = datetime.now().timestamp()
                age_hours = (now_ts - pub_time) / 3600 if pub_time else 99

                bullish_keywords = [
                    "beat", "surges", "jumps", "rally", "upgrade", "buy",
                    "record", "acquisition", "merger", "deal", "patent",
                    "approval", "fda", "earnings", "profit", "revenue",
                ]
                if age_hours <= 24 and any(k in headline.lower() for k in bullish_keywords):
                    signals.append("NEWS_CATALYST")
                    details["news_headline"] = headline[:120]
                    details["news_age_hours"] = round(age_hours, 1)
                    score += 15
            else:
                headline = None
        except Exception:
            headline = None

        # ------------------------------------------------------------------
        # No signals — skip this ticker
        # ------------------------------------------------------------------
        if not signals:
            return None

        # ------------------------------------------------------------------
        # Estimate upside based on signal strength and historical behavior
        # ------------------------------------------------------------------
        base_upside = premarket_pct if "PRE_MARKET_SURGE" in signals else abs(
            (current_price - prev_close) / prev_close * 100
        )
        signal_multiplier = 1.0 + (len(signals) - 1) * 0.3
        estimated_upside = min(base_upside * signal_multiplier * 1.5, 60.0)

        # Cap score at 100
        score = min(score, 100)

        return StockAlert(
            ticker=ticker,
            current_price=current_price,
            prev_close=prev_close,
            signals_triggered=signals,
            signal_details=details,
            spike_probability_score=score,
            estimated_upside_pct=round(estimated_upside, 1),
            market_cap=_safe_float(info.get("marketCap")),
            news_headline=headline,
        )

    except Exception as e:
        logger.debug(f"Failed to analyze {ticker}: {e}")
        return None


def scan_market(tickers: list[str] | None = None) -> list[StockAlert]:
    """
    Scan the watchlist for spike signals.
    Returns alerts sorted by spike_probability_score descending.
    """
    if tickers is None:
        tickers = WATCHLIST_TICKERS

    now_et = _get_et_time()
    logger.info(f"Starting market scan at {now_et.strftime('%H:%M:%S ET')} for {len(tickers)} tickers")

    alerts: list[StockAlert] = []

    for i, ticker in enumerate(tickers):
        if i > 0 and i % 20 == 0:
            logger.info(f"  Scanned {i}/{len(tickers)} tickers, {len(alerts)} alerts so far...")

        alert = _analyze_ticker(ticker)
        if alert and alert.spike_probability_score >= config.thresholds.min_score_for_alert:
            alerts.append(alert)
            logger.info(f"  ALERT: {alert}")

    alerts.sort(key=lambda a: a.spike_probability_score, reverse=True)
    logger.info(f"Scan complete: {len(alerts)} alerts found")
    return alerts
