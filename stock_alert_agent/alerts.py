"""
Alert delivery module: email (HTML) and SMS (Twilio) for stock spike alerts.
"""

from __future__ import annotations

import logging
import smtplib
from datetime import datetime
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

import pytz

from config import config
from signals import StockAlert

logger = logging.getLogger(__name__)

ET = pytz.timezone("America/New_York")


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _score_color(score: int) -> str:
    """Return a hex color based on confidence level."""
    if score >= 85:
        return "#c0392b"    # red – very high confidence
    if score >= 75:
        return "#e67e22"    # orange – high
    if score >= 65:
        return "#27ae60"    # green – moderate
    return "#7f8c8d"        # grey – low


def _score_label(score: int) -> str:
    if score >= 85:
        return "VERY HIGH"
    if score >= 75:
        return "HIGH"
    if score >= 65:
        return "MODERATE"
    return "LOW"


def _score_bg(score: int) -> str:
    """Light background color for score badge."""
    if score >= 85:
        return "#fdecea"
    if score >= 75:
        return "#fef3e2"
    if score >= 65:
        return "#eafaf1"
    return "#f4f4f4"


def _format_market_cap(mc: float | None) -> str:
    if not mc or mc <= 0:
        return "—"
    if mc >= 1e12:
        return f"${mc / 1e12:.1f}T"
    if mc >= 1e9:
        return f"${mc / 1e9:.1f}B"
    if mc >= 1e6:
        return f"${mc / 1e6:.1f}M"
    return f"${mc:.0f}"


# Signal display metadata: label, hex badge color
_SIGNAL_META: dict[str, tuple[str, str]] = {
    "PRE_MARKET_SURGE":     ("Pre-Market Surge",    "#2980b9"),
    "UNUSUAL_VOLUME":       ("Unusual Volume",       "#8e44ad"),
    "GAP_UP":               ("Gap Up",               "#27ae60"),
    "52W_HIGH_BREAKOUT":    ("52W High Breakout",    "#c0392b"),
    "SHORT_SQUEEZE_SETUP":  ("Short Squeeze",        "#e67e22"),
    "NEWS_CATALYST":        ("News Catalyst",        "#2c3e50"),
    "EARNINGS_BEAT":        ("Earnings Beat",        "#16a085"),
    "OPTIONS_FLOW_SIGNAL":  ("Options Flow",         "#6c3483"),
}


def _signals_html(alert: StockAlert) -> str:
    """Render colored badge pills for each triggered signal."""
    badges = []
    for s in alert.signals_triggered:
        label, color = _SIGNAL_META.get(s, (s.replace("_", " "), "#555"))
        badges.append(
            f'<span style="display:inline-block;background:{color};color:#fff;'
            f'padding:2px 8px;border-radius:12px;font-size:11px;'
            f'margin:1px 2px 1px 0;white-space:nowrap">{label}</span>'
        )
    return "".join(badges)


def _detail_text(alert: StockAlert) -> str:
    """Build a compact detail string from signal_details."""
    d = alert.signal_details
    parts = []
    if "premarket_pct" in d:
        parts.append(f"Pre-mkt: {d['premarket_pct']:+.1f}%")
    if "volume_ratio" in d:
        parts.append(f"Vol: {d['volume_ratio']:.1f}x avg")
    if "gap_pct" in d:
        parts.append(f"Gap: {d['gap_pct']:+.1f}%")
    if "pct_from_52w_high" in d:
        val = d["pct_from_52w_high"]
        if val <= 0:
            parts.append(f"52W high: +{abs(val):.1f}% above")
        else:
            parts.append(f"52W high: {val:.1f}% below")
    if "days_to_cover" in d and d["days_to_cover"] > 0:
        parts.append(
            f"Short: {d.get('short_pct_float', 0):.1f}% float, "
            f"{d['days_to_cover']:.1f}d to cover"
        )
    if "vol_spike_ratio" in d:
        parts.append(f"Vol spike: {d['vol_spike_ratio']:.1f}x, β={d.get('beta', '?')}")
    if "avg_atm_iv_pct" in d:
        parts.append(f"ATM IV: {d['avg_atm_iv_pct']:.0f}%")
    if "earnings_day_change_pct" in d:
        parts.append(f"Earnings move: {d['earnings_day_change_pct']:+.1f}%")
    if "news_headline" in d:
        parts.append(f"📰 {d['news_headline'][:70]}…")
    return " &nbsp;|&nbsp; ".join(parts) if parts else "—"


def _build_html_email(alerts: list[StockAlert]) -> str:
    """Construct the full HTML email body."""
    now_str = datetime.now(ET).strftime("%Y-%m-%d %H:%M ET")
    rows = []
    for a in alerts:
        clr = _score_color(a.spike_probability_score)
        bg = _score_bg(a.spike_probability_score)
        lbl = _score_label(a.spike_probability_score)
        change_color = "#27ae60" if a.change_pct >= 0 else "#c0392b"
        upside_color = "#27ae60" if a.estimated_upside_pct > 0 else "#888"
        rows.append(f"""
        <tr style="border-bottom:1px solid #ebebeb;vertical-align:top">
          <td style="padding:10px 8px;font-weight:bold;font-size:15px;
                     white-space:nowrap;color:#1a1a2e">
            <a href="https://finance.yahoo.com/quote/{a.ticker}"
               style="color:#1a1a2e;text-decoration:none">${a.ticker}</a>
          </td>
          <td style="padding:10px 8px;white-space:nowrap">${a.current_price:.2f}</td>
          <td style="padding:10px 8px;color:{change_color};font-weight:bold;white-space:nowrap">
            {a.change_pct:+.2f}%
          </td>
          <td style="padding:10px 8px">{_signals_html(a)}</td>
          <td style="padding:10px 8px;text-align:center">
            <span style="display:inline-block;background:{bg};color:{clr};
                         font-weight:bold;padding:4px 8px;border-radius:6px;
                         border:1px solid {clr};font-size:13px;white-space:nowrap">
              {a.spike_probability_score}/100
            </span><br>
            <span style="font-size:10px;color:{clr}">{lbl}</span>
          </td>
          <td style="padding:10px 8px;color:{upside_color};font-weight:bold;
                     white-space:nowrap">+{a.estimated_upside_pct:.1f}%</td>
          <td style="padding:10px 8px;font-size:11px;color:#555;max-width:280px">
            <div style="margin-bottom:3px">{_detail_text(a)}</div>
            <div style="color:#888;font-size:10px">Buy window: {a.buy_window}</div>
          </td>
          <td style="padding:10px 8px;font-size:11px;color:#888;white-space:nowrap">
            {_format_market_cap(a.market_cap)}
          </td>
        </tr>""")

    top_ticker = alerts[0].ticker if alerts else ""
    count = len(alerts)

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Stock Spike Alert</title>
</head>
<body style="margin:0;padding:0;background:#f0f2f5;font-family:Arial,Helvetica,sans-serif;color:#222">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:1200px;margin:20px auto">
    <tr>
      <td>
        <!-- Header -->
        <div style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 60%,#0f3460 100%);
                    color:#fff;padding:24px 30px;border-radius:10px 10px 0 0">
          <h2 style="margin:0 0 6px;font-size:22px;letter-spacing:-0.3px">
            &#x1F4C8; Stock Spike Alert
          </h2>
          <p style="margin:0;color:#94a3b8;font-size:13px">{now_str}</p>
          <p style="margin:8px 0 0;color:#e2e8f0;font-size:14px">
            <strong>{count}</strong> spike opportunit{'y' if count == 1 else 'ies'} detected
            — top pick: <strong>${top_ticker}</strong>
          </p>
        </div>

        <!-- Table -->
        <div style="background:#fff;border:1px solid #dde1e7;
                    border-top:none;border-radius:0 0 10px 10px;overflow-x:auto">
          <table width="100%" cellpadding="0" cellspacing="0"
                 style="border-collapse:collapse;min-width:750px">
            <thead>
              <tr style="background:#f8f9fb;border-bottom:2px solid #dde1e7;text-align:left">
                <th style="padding:10px 8px;font-size:12px;color:#64748b;font-weight:600">TICKER</th>
                <th style="padding:10px 8px;font-size:12px;color:#64748b;font-weight:600">PRICE</th>
                <th style="padding:10px 8px;font-size:12px;color:#64748b;font-weight:600">CHANGE</th>
                <th style="padding:10px 8px;font-size:12px;color:#64748b;font-weight:600">SIGNALS</th>
                <th style="padding:10px 8px;font-size:12px;color:#64748b;font-weight:600;text-align:center">SCORE</th>
                <th style="padding:10px 8px;font-size:12px;color:#64748b;font-weight:600">EST. UPSIDE</th>
                <th style="padding:10px 8px;font-size:12px;color:#64748b;font-weight:600">DETAILS</th>
                <th style="padding:10px 8px;font-size:12px;color:#64748b;font-weight:600">MKT CAP</th>
              </tr>
            </thead>
            <tbody>
              {"".join(rows)}
            </tbody>
          </table>
        </div>

        <!-- Score legend -->
        <div style="margin-top:16px;padding:12px 16px;background:#fff;
                    border:1px solid #dde1e7;border-radius:8px;font-size:12px">
          <strong style="color:#555">Score guide:</strong>
          &nbsp;
          <span style="color:#27ae60">&#9632; 65–74 Moderate</span> &nbsp;|&nbsp;
          <span style="color:#e67e22">&#9632; 75–84 High</span> &nbsp;|&nbsp;
          <span style="color:#c0392b">&#9632; 85–100 Very High</span>
        </div>

        <!-- Disclaimer -->
        <div style="margin-top:12px;padding:14px 16px;background:#fffbeb;
                    border:1px solid #fcd34d;border-radius:8px;font-size:11px;color:#92400e">
          <strong>&#9888;&#65039; Disclaimer:</strong>
          This is an automated informational alert, not financial advice.
          Signals can produce false positives. Always conduct your own research before making
          any investment decisions. Past signal patterns do not guarantee future results.
          Options, leveraged ETFs, and high-short-interest stocks carry substantial risk.
        </div>

      </td>
    </tr>
  </table>
</body>
</html>"""


# ---------------------------------------------------------------------------
# Email sender
# ---------------------------------------------------------------------------

def send_email_alert(alerts: list[StockAlert]) -> bool:
    """
    Send an HTML email summarising all alerts.

    Returns True on success, False on failure / not configured.
    """
    cfg = config.email
    if not cfg.is_configured:
        logger.warning("Email not configured (missing SENDER_EMAIL / SENDER_PASSWORD) — skipping")
        return False

    if not alerts:
        logger.info("send_email_alert called with empty list — nothing to send")
        return False

    try:
        msg = MIMEMultipart("alternative")

        # Subject line
        top_tickers = ", ".join(f"${a.ticker}" for a in alerts[:4])
        if len(alerts) > 4:
            top_tickers += f" +{len(alerts) - 4} more"
        msg["Subject"] = f"Spike Alert: {top_tickers} — {len(alerts)} signal{'s' if len(alerts) != 1 else ''} fired"
        msg["From"] = cfg.sender_email
        msg["To"] = cfg.recipient_email

        # Plain-text fallback
        plain_lines = [
            f"Stock Spike Alert — {datetime.now(ET).strftime('%Y-%m-%d %H:%M ET')}",
            f"{len(alerts)} alert(s) detected:\n",
        ]
        for a in alerts:
            plain_lines.append(
                f"  ${a.ticker}: ${a.current_price:.2f} ({a.change_pct:+.2f}%) "
                f"| Score: {a.spike_probability_score}/100 "
                f"| Est. upside: +{a.estimated_upside_pct:.1f}% "
                f"| Signals: {', '.join(a.signals_triggered)}"
            )
        plain_lines.append("\nDisclaimer: Not financial advice. Do your own research.")
        plain_body = "\n".join(plain_lines)

        msg.attach(MIMEText(plain_body, "plain"))
        msg.attach(MIMEText(_build_html_email(alerts), "html"))

        with smtplib.SMTP(cfg.smtp_host, cfg.smtp_port, timeout=15) as server:
            if cfg.use_tls:
                server.ehlo()
                server.starttls()
                server.ehlo()
            server.login(cfg.sender_email, cfg.sender_password)
            server.sendmail(cfg.sender_email, cfg.recipient_email, msg.as_string())

        logger.info("Email sent to %s with %d alert(s)", cfg.recipient_email, len(alerts))
        return True

    except smtplib.SMTPAuthenticationError as exc:
        logger.error("SMTP authentication failed — check EMAIL_SENDER / EMAIL_PASSWORD: %s", exc)
        return False
    except smtplib.SMTPException as exc:
        logger.error("SMTP error sending email: %s", exc)
        return False
    except Exception as exc:
        logger.error("Unexpected error sending email: %s", exc)
        return False


# ---------------------------------------------------------------------------
# SMS sender
# ---------------------------------------------------------------------------

def send_sms_alert(alert: StockAlert) -> bool:
    """
    Send a concise SMS for a single high-confidence alert via Twilio.

    Returns True on success, False on failure / not configured.
    """
    cfg = config.twilio
    if not cfg.is_configured:
        logger.warning("Twilio not configured — skipping SMS for %s", alert.ticker)
        return False

    try:
        from twilio.rest import Client  # lazy import — app works without twilio if SMS unused

        signals_short = ", ".join(
            _SIGNAL_META.get(s, (s.replace("_", " "), ""))[0]
            for s in alert.signals_triggered[:3]
        )
        if len(alert.signals_triggered) > 3:
            signals_short += f" +{len(alert.signals_triggered) - 3} more"

        body = (
            f"SPIKE ALERT: ${alert.ticker} @ ${alert.current_price:.2f} "
            f"({alert.change_pct:+.1f}%)\n"
            f"Score: {alert.spike_probability_score}/100 | "
            f"Est upside: +{alert.estimated_upside_pct:.1f}%\n"
            f"Signals: {signals_short}\n"
            f"Buy window: {alert.buy_window}\n"
            f"Not financial advice."
        )

        # Truncate to Twilio's 1600-char limit (single SMS is 160 chars, but we keep it concise)
        body = body[:1600]

        client = Client(cfg.account_sid, cfg.auth_token)
        message = client.messages.create(
            body=body,
            from_=cfg.from_number,
            to=cfg.to_number,
        )
        logger.info("SMS sent for %s: SID=%s", alert.ticker, message.sid)
        return True

    except ImportError:
        logger.error("twilio package not installed — run: pip install twilio")
        return False
    except Exception as exc:
        logger.error("Failed to send SMS for %s: %s", alert.ticker, exc)
        return False
