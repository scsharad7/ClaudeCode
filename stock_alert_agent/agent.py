"""
Stock Spike Alert Agent — main entry point.

Runs a scheduled scan loop during market hours (ET), sends email + SMS alerts
when spike signals are detected, and avoids duplicate alerts via a cooldown cache.

Schedule:
  - Every 5 min  : 4:00 AM – 10:00 AM ET  (pre-market + first 30 min of trading)
  - Every 15 min : 10:00 AM – 4:00 PM ET  (regular trading hours)
  - Weekends     : no scans

Usage:
    python agent.py            # start the live agent
    python agent.py --test     # run one scan immediately, print results, no alerts sent
    python agent.py --test --tickers NVDA AMD SMCI    # test specific tickers
"""

from __future__ import annotations

import argparse
import logging
import sys
import time as time_module
from datetime import datetime, time as dt_time, timedelta
from typing import Optional

import pytz
import schedule

from alerts import send_email_alert, send_sms_alert
from config import config, validate_config
from signals import StockAlert, scan_market

# ---------------------------------------------------------------------------
# Timezone
# ---------------------------------------------------------------------------

ET = pytz.timezone("America/New_York")


# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------

def _setup_logging(log_file: str) -> None:
    fmt = "%(asctime)s [%(levelname)s] %(name)s — %(message)s"
    datefmt = "%Y-%m-%d %H:%M:%S"
    handlers: list[logging.Handler] = [logging.StreamHandler(sys.stdout)]
    if log_file:
        try:
            fh = logging.FileHandler(log_file, encoding="utf-8")
            handlers.append(fh)
        except OSError as exc:
            print(f"[WARNING] Could not open log file {log_file!r}: {exc}")
    logging.basicConfig(level=logging.INFO, format=fmt, datefmt=datefmt, handlers=handlers)


# ---------------------------------------------------------------------------
# Cooldown cache
# Prevents duplicate alerts for the same ticker within the cooldown window.
# ---------------------------------------------------------------------------

_alerted_at: dict[str, datetime] = {}


def _is_on_cooldown(ticker: str) -> bool:
    last = _alerted_at.get(ticker)
    if last is None:
        return False
    cooldown = timedelta(hours=config.thresholds.alert_cooldown_hours)
    return datetime.now() - last < cooldown


def _mark_alerted(ticker: str) -> None:
    _alerted_at[ticker] = datetime.now()


def _cooldown_remaining(ticker: str) -> str:
    last = _alerted_at.get(ticker)
    if last is None:
        return "0h"
    remaining = timedelta(hours=config.thresholds.alert_cooldown_hours) - (datetime.now() - last)
    if remaining.total_seconds() <= 0:
        return "0h"
    total_min = int(remaining.total_seconds() / 60)
    return f"{total_min // 60}h{total_min % 60:02d}m"


# ---------------------------------------------------------------------------
# Core scan + dispatch
# ---------------------------------------------------------------------------

def run_scan(
    test_mode: bool = False,
    override_tickers: Optional[list[str]] = None,
) -> list[StockAlert]:
    """
    Execute a market scan and dispatch alerts.

    Args:
        test_mode:         If True, print results but do NOT send any alerts.
        override_tickers:  Scan only these tickers (for --test --tickers ...).

    Returns:
        List of StockAlert objects that were processed (regardless of cooldown).
    """
    log = logging.getLogger(__name__)
    now_et = datetime.now(ET)
    log.info("=== Scan triggered at %s ===", now_et.strftime("%Y-%m-%d %H:%M:%S ET"))

    alerts = scan_market(tickers=override_tickers)

    if not alerts:
        log.info("No alerts generated this scan.")
        return []

    # Cooldown filter
    on_cooldown = [a for a in alerts if _is_on_cooldown(a.ticker)]
    fresh_alerts = [a for a in alerts if not _is_on_cooldown(a.ticker)]

    if on_cooldown:
        cd_info = ", ".join(
            f"{a.ticker}({_cooldown_remaining(a.ticker)} left)" for a in on_cooldown
        )
        log.info("Skipping %d ticker(s) still in cooldown: %s", len(on_cooldown), cd_info)

    if not fresh_alerts:
        log.info("All alerts are within cooldown window — nothing new to dispatch.")
        return alerts

    log.info("%d fresh alert(s) after cooldown filter:", len(fresh_alerts))
    for a in fresh_alerts:
        log.info("  %s", a)

    # ---- Test mode: pretty-print only ----------------------------------------
    if test_mode:
        _print_test_results(fresh_alerts)
        return alerts

    # ---- Live mode: dispatch alerts ------------------------------------------
    email_alerts = [
        a for a in fresh_alerts
        if a.spike_probability_score >= config.thresholds.min_score_for_alert
    ]
    if email_alerts:
        ok = send_email_alert(email_alerts)
        log.info("Email dispatch: %s (%d alerts)", "OK" if ok else "FAILED", len(email_alerts))

    sms_sent = 0
    for a in fresh_alerts:
        if a.spike_probability_score >= config.thresholds.min_score_for_sms:
            ok = send_sms_alert(a)
            if ok:
                sms_sent += 1

    if sms_sent:
        log.info("SMS dispatched for %d high-confidence alert(s)", sms_sent)

    # Mark all fresh alerts as alerted (even if dispatch failed, to avoid spam)
    for a in fresh_alerts:
        _mark_alerted(a.ticker)

    return alerts


def _print_test_results(alerts: list[StockAlert]) -> None:
    """Pretty-print alert results to stdout in test mode."""
    sep = "=" * 72

    print("\n" + sep)
    print("  TEST MODE — scan results (no alerts sent)")
    print(sep)

    if not alerts:
        print("  No alerts generated.")
        print(sep + "\n")
        return

    print(f"  {len(alerts)} alert(s) found:\n")
    for i, a in enumerate(alerts, 1):
        score_bar = _score_bar(a.spike_probability_score)
        print(f"  [{i}] ${a.ticker:6s}  ${a.current_price:>9.2f}  ({a.change_pct:+6.2f}%)")
        print(f"       Score : {a.spike_probability_score:3d}/100  {score_bar}")
        print(f"       Upside: +{a.estimated_upside_pct:.1f}%  |  Window: {a.buy_window}")
        print(f"       Signals ({len(a.signals_triggered)}): {', '.join(a.signals_triggered)}")

        d = a.signal_details
        detail_parts = []
        if "premarket_pct" in d:
            detail_parts.append(f"pre-mkt {d['premarket_pct']:+.1f}%")
        if "volume_ratio" in d:
            detail_parts.append(f"vol {d['volume_ratio']:.1f}x")
        if "gap_pct" in d:
            detail_parts.append(f"gap {d['gap_pct']:+.1f}%")
        if "pct_from_52w_high" in d:
            detail_parts.append(f"52wH {d['pct_from_52w_high']:+.1f}%")
        if "days_to_cover" in d and d["days_to_cover"] > 0:
            detail_parts.append(f"DTC={d['days_to_cover']:.1f} short={d.get('short_pct_float', 0):.1f}%")
        if "earnings_day_change_pct" in d:
            detail_parts.append(f"earnings move {d['earnings_day_change_pct']:+.1f}%")
        if "avg_atm_iv_pct" in d:
            detail_parts.append(f"IV={d['avg_atm_iv_pct']:.0f}%")
        if detail_parts:
            print(f"       Details: {' | '.join(detail_parts)}")

        if a.news_headline:
            print(f"       News: {a.news_headline[:80]}…")
        if a.market_cap:
            mc = a.market_cap
            if mc >= 1e12:
                mc_str = f"${mc/1e12:.1f}T"
            elif mc >= 1e9:
                mc_str = f"${mc/1e9:.1f}B"
            else:
                mc_str = f"${mc/1e6:.1f}M"
            print(f"       Mkt cap: {mc_str}")
        print()

    print(sep)
    print("  Disclaimer: Not financial advice. Do your own research.")
    print(sep + "\n")


def _score_bar(score: int, width: int = 20) -> str:
    """ASCII progress bar for score display."""
    filled = int(score / 100 * width)
    bar = "#" * filled + "." * (width - filled)
    if score >= 85:
        return f"[{bar}] VERY HIGH"
    if score >= 75:
        return f"[{bar}] HIGH"
    if score >= 65:
        return f"[{bar}] MODERATE"
    return f"[{bar}] LOW"


# ---------------------------------------------------------------------------
# Schedule helpers
# ---------------------------------------------------------------------------

def _get_scan_interval_minutes(now_et: Optional[datetime] = None) -> int:
    """Return the appropriate scan interval based on current ET time."""
    if now_et is None:
        now_et = datetime.now(ET)
    hour = now_et.hour
    # Pre-market + first 30 min of regular session → fast interval
    if now_et.time() < dt_time(10, 0):
        return config.scan.premarket_scan_interval_minutes
    return config.scan.regular_scan_interval_minutes


def _is_market_window(now_et: Optional[datetime] = None) -> bool:
    """
    Return True if we're within the monitored window:
    Monday–Friday, premarket_start_hour to market_close_hour ET.
    """
    if now_et is None:
        now_et = datetime.now(ET)
    if now_et.weekday() >= 5:   # Saturday = 5, Sunday = 6
        return False
    hour = now_et.hour
    return config.scan.premarket_start_hour <= hour < config.scan.market_close_hour


# ---------------------------------------------------------------------------
# Dynamic scheduler
# ---------------------------------------------------------------------------

_last_scan_time: Optional[datetime] = None
_current_interval: Optional[int] = None


def _tick() -> None:
    """
    Called every 60 seconds by the schedule loop.
    Fires a scan when the correct interval has elapsed since the last scan.
    """
    global _last_scan_time, _current_interval

    now_et = datetime.now(ET)
    if not _is_market_window(now_et):
        return

    interval = _get_scan_interval_minutes(now_et)

    if _current_interval != interval:
        logging.getLogger(__name__).info(
            "Scan interval changed to %d min at %s ET",
            interval,
            now_et.strftime("%H:%M"),
        )
        _current_interval = interval

    if _last_scan_time is None or (now_et - _last_scan_time).total_seconds() >= interval * 60:
        _last_scan_time = now_et
        try:
            run_scan()
        except Exception as exc:
            logging.getLogger(__name__).error("Unhandled exception in run_scan: %s", exc, exc_info=True)


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(
        description="Stock Spike Alert Agent — detects pre-spike signals and sends alerts",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python agent.py                         # start live agent
  python agent.py --test                  # scan full watchlist, print results
  python agent.py --test --tickers NVDA AMD SMCI MSTR
        """,
    )
    parser.add_argument(
        "--test",
        action="store_true",
        help="Run one scan immediately, print results, do NOT send any alerts",
    )
    parser.add_argument(
        "--tickers",
        nargs="+",
        metavar="TICKER",
        default=None,
        help="Limit scan to specific tickers (use with --test or for quick checks)",
    )
    args = parser.parse_args()

    _setup_logging(config.scan.log_file)
    log = logging.getLogger(__name__)

    # Warn about missing credentials
    for warning in validate_config():
        log.warning("Config warning: %s", warning)

    # ---- Test mode -----------------------------------------------------------
    if args.test:
        log.info("Running in TEST MODE — one scan, no alerts will be sent")
        if args.tickers:
            log.info("Scanning %d custom ticker(s): %s", len(args.tickers), ", ".join(args.tickers))
        run_scan(test_mode=True, override_tickers=args.tickers)
        return

    # ---- Live mode -----------------------------------------------------------
    if args.tickers:
        log.warning("--tickers is ignored in live mode; use --test --tickers for a focused scan")

    log.info("=" * 60)
    log.info("Stock Spike Alert Agent starting…")
    log.info("  Email configured : %s", config.email.is_configured)
    log.info("  SMS configured   : %s", config.twilio.is_configured)
    log.info("  Email recipient  : %s", config.email.recipient_email)
    log.info("  Alert threshold  : score >= %d", config.thresholds.min_score_for_alert)
    log.info("  SMS threshold    : score >= %d", config.thresholds.min_score_for_sms)
    log.info("  Cooldown         : %d hours", config.thresholds.alert_cooldown_hours)
    log.info(
        "  Schedule         : Mon–Fri %d:00–%d:00 ET | %d min (pre-market) / %d min (regular)",
        config.scan.premarket_start_hour,
        config.scan.market_close_hour,
        config.scan.premarket_scan_interval_minutes,
        config.scan.regular_scan_interval_minutes,
    )
    log.info("  Log file         : %s", config.scan.log_file or "(stdout only)")
    log.info("=" * 60)

    if not config.email.is_configured and not config.twilio.is_configured:
        log.warning(
            "Neither email nor SMS is configured! Scans will run but no alerts will be sent. "
            "Copy .env.example to .env and fill in your credentials."
        )

    # Tick every 60 seconds; _tick() decides whether a scan is due
    schedule.every(1).minutes.do(_tick)

    # Fire an immediate tick so we don't wait a full minute on startup
    _tick()

    log.info("Scheduler running. Press Ctrl+C to stop.")
    try:
        while True:
            schedule.run_pending()
            time_module.sleep(30)
    except KeyboardInterrupt:
        log.info("Agent stopped by user.")
        sys.exit(0)


if __name__ == "__main__":
    main()
