"""
Stock Spike Alert Agent — main entry point.

Runs a scheduled scan loop during market hours (ET), sends email + SMS alerts
when spike signals are detected, and avoids duplicate alerts via a cooldown cache.

Usage:
    python agent.py            # start the live agent
    python agent.py --test     # run one scan immediately, print results, no alerts sent
"""

from __future__ import annotations

import argparse
import logging
import sys
import time
from datetime import datetime, timedelta
from typing import Optional

import pytz
import schedule

from alerts import send_email_alert, send_sms_alert
from config import config
from signals import StockAlert, scan_market

# ---------------------------------------------------------------------------
# Logging setup
# ---------------------------------------------------------------------------

ET = pytz.timezone("America/New_York")


def _setup_logging(log_file: str) -> None:
    fmt = "%(asctime)s [%(levelname)s] %(message)s"
    handlers: list[logging.Handler] = [logging.StreamHandler(sys.stdout)]
    if log_file:
        handlers.append(logging.FileHandler(log_file))
    logging.basicConfig(level=logging.INFO, format=fmt, handlers=handlers)


# ---------------------------------------------------------------------------
# Cooldown cache — prevents duplicate alerts for the same ticker
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


# ---------------------------------------------------------------------------
# Core scan + dispatch
# ---------------------------------------------------------------------------

def run_scan(test_mode: bool = False) -> None:
    logger = logging.getLogger(__name__)
    now_et = datetime.now(ET)
    logger.info(f"=== Scan triggered at {now_et.strftime('%Y-%m-%d %H:%M:%S ET')} ===")

    alerts = scan_market()

    if not alerts:
        logger.info("No alerts generated this scan.")
        return

    # Filter out tickers in cooldown
    fresh_alerts = [a for a in alerts if not _is_on_cooldown(a.ticker)]
    if not fresh_alerts:
        logger.info("All alerts are within cooldown window — skipping dispatch.")
        return

    logger.info(f"{len(fresh_alerts)} fresh alerts (after cooldown filter):")
    for a in fresh_alerts:
        logger.info(f"  {a}")

    if test_mode:
        print("\n" + "=" * 70)
        print("TEST MODE — alerts would be dispatched:")
        print("=" * 70)
        for a in fresh_alerts:
            print(f"\n  ${a.ticker:6s}  ${a.current_price:.2f}  ({a.change_pct:+.2f}%)")
            print(f"  Score: {a.spike_probability_score}/100  |  Est. upside: +{a.estimated_upside_pct}%")
            print(f"  Signals: {', '.join(a.signals_triggered)}")
            if a.signal_details:
                print(f"  Details: {a.signal_details}")
        print("=" * 70 + "\n")
        return

    # Send email for all fresh alerts above email threshold
    email_alerts = [
        a for a in fresh_alerts
        if a.spike_probability_score >= config.thresholds.min_score_for_alert
    ]
    if email_alerts:
        send_email_alert(email_alerts)

    # Send SMS for high-confidence alerts only
    for a in fresh_alerts:
        if a.spike_probability_score >= config.thresholds.min_score_for_sms:
            send_sms_alert(a)

    # Mark all as alerted
    for a in fresh_alerts:
        _mark_alerted(a.ticker)


# ---------------------------------------------------------------------------
# Schedule helpers
# ---------------------------------------------------------------------------

def _get_scan_interval_minutes(now_et: Optional[datetime] = None) -> int:
    """Return the correct scan interval based on current ET time."""
    if now_et is None:
        now_et = datetime.now(ET)
    hour = now_et.hour
    if hour < config.scan.intensive_end_hour:
        return config.scan.premarket_scan_interval_minutes
    return config.scan.regular_scan_interval_minutes


def _is_market_window(now_et: Optional[datetime] = None) -> bool:
    """Return True if we're within the monitored window (Mon-Fri, 4 AM – 4 PM ET)."""
    if now_et is None:
        now_et = datetime.now(ET)
    if now_et.weekday() >= 5:   # Saturday=5, Sunday=6
        return False
    hour = now_et.hour
    return config.scan.premarket_start_hour <= hour < config.scan.market_close_hour


# ---------------------------------------------------------------------------
# Dynamic scheduler — re-evaluates interval each tick
# ---------------------------------------------------------------------------

_last_scan_time: Optional[datetime] = None
_current_interval: Optional[int] = None


def _tick() -> None:
    """Called every minute. Fires a scan when the interval has elapsed."""
    global _last_scan_time, _current_interval

    now_et = datetime.now(ET)
    if not _is_market_window(now_et):
        return

    interval = _get_scan_interval_minutes(now_et)

    # If interval changed (e.g., crossed 10 AM), reschedule immediately
    if _current_interval != interval:
        logging.getLogger(__name__).info(
            f"Scan interval changed to {interval} min at {now_et.strftime('%H:%M ET')}"
        )
        _current_interval = interval

    if _last_scan_time is None or (now_et - _last_scan_time).total_seconds() >= interval * 60:
        _last_scan_time = now_et
        run_scan()


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(description="Stock Spike Alert Agent")
    parser.add_argument(
        "--test", action="store_true",
        help="Run a single scan immediately and print results without sending alerts"
    )
    args = parser.parse_args()

    _setup_logging(config.scan.log_file)
    logger = logging.getLogger(__name__)

    if args.test:
        logger.info("Running in TEST MODE — one scan, no alerts sent")
        run_scan(test_mode=True)
        return

    logger.info("Stock Spike Alert Agent starting...")
    logger.info(f"  Email configured: {config.email.is_configured}")
    logger.info(f"  SMS configured:   {config.twilio.is_configured}")
    logger.info(f"  Alert threshold:  score >= {config.thresholds.min_score_for_alert}")
    logger.info(f"  SMS threshold:    score >= {config.thresholds.min_score_for_sms}")
    logger.info(f"  Monitoring:       Mon-Fri {config.scan.premarket_start_hour}:00 – "
                f"{config.scan.market_close_hour}:00 ET")
    logger.info(f"  Intervals:        {config.scan.premarket_scan_interval_minutes} min (pre-market) / "
                f"{config.scan.regular_scan_interval_minutes} min (regular)")

    # Tick every 60 seconds to check whether a scan is due
    schedule.every(1).minutes.do(_tick)

    # Run an immediate tick on startup
    _tick()

    while True:
        schedule.run_pending()
        time.sleep(30)


if __name__ == "__main__":
    main()
