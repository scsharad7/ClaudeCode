"""
Alert delivery: email (HTML) and SMS (Twilio) for stock spike alerts.
"""

from __future__ import annotations

import logging
import smtplib
from datetime import datetime
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from config import config
from signals import StockAlert

logger = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _score_color(score: int) -> str:
    if score >= 85:
        return "#c0392b"   # red — very high confidence
    if score >= 75:
        return "#e67e22"   # orange
    if score >= 65:
        return "#27ae60"   # green
    return "#7f8c8d"       # grey


def _score_label(score: int) -> str:
    if score >= 85:
        return "VERY HIGH"
    if score >= 75:
        return "HIGH"
    if score >= 65:
        return "MODERATE"
    return "LOW"


def _format_market_cap(mc: float | None) -> str:
    if not mc:
        return "—"
    if mc >= 1e12:
        return f"${mc/1e12:.1f}T"
    if mc >= 1e9:
        return f"${mc/1e9:.1f}B"
    if mc >= 1e6:
        return f"${mc/1e6:.1f}M"
    return f"${mc:.0f}"


def _signals_html(alert: StockAlert) -> str:
    badges = []
    colors = {
        "PRE_MARKET_SURGE": "#2980b9",
        "UNUSUAL_VOLUME": "#8e44ad",
        "GAP_UP": "#27ae60",
        "52W_HIGH_BREAKOUT": "#c0392b",
        "SHORT_SQUEEZE_SETUP": "#e67e22",
        "OPTIONS_FLOW_SIGNAL": "#16a085",
        "NEWS_CATALYST": "#2c3e50",
    }
    for s in alert.signals_triggered:
        color = colors.get(s, "#555")
        label = s.replace("_", " ")
        badges.append(
            f'<span style="background:{color};color:#fff;padding:2px 7px;'
            f'border-radius:10px;font-size:11px;margin-right:3px">{label}</span>'
        )
    return "".join(badges)


def _build_html_email(alerts: list[StockAlert]) -> str:
    now_str = datetime.now().strftime("%Y-%m-%d %H:%M ET")
    rows = []
    for a in alerts:
        color = _score_color(a.spike_probability_score)
        label = _score_label(a.spike_probability_score)
        detail_lines = []
        d = a.signal_details
        if "premarket_pct" in d:
            detail_lines.append(f"Pre-mkt: +{d['premarket_pct']}%")
        if "volume_ratio" in d:
            detail_lines.append(f"Vol: {d['volume_ratio']}x avg")
        if "gap_pct" in d:
            detail_lines.append(f"Gap: +{d['gap_pct']}%")
        if "pct_from_52w_high" in d:
            detail_lines.append(f"52wk high: {d['pct_from_52w_high']}% away")
        if "short_pct_float" in d:
            detail_lines.append(f"Short: {d['short_pct_float']}% float, {d['days_to_cover']}d to cover")
        if "vol_spike_ratio" in d:
            detail_lines.append(f"Vol spike: {d['vol_spike_ratio']}x, β={d.get('beta', '?')}")
        if "news_headline" in d:
            detail_lines.append(f"News: {d['news_headline'][:80]}…")

        rows.append(f"""
        <tr style="border-bottom:1px solid #eee">
          <td style="padding:10px 8px;font-weight:bold;font-size:16px">${a.ticker}</td>
          <td style="padding:10px 8px">${a.current_price:.2f}</td>
          <td style="padding:10px 8px;color:{'#27ae60' if a.change_pct >= 0 else '#c0392b'}">
            {a.change_pct:+.2f}%
          </td>
          <td style="padding:10px 8px">{_signals_html(a)}</td>
          <td style="padding:10px 8px;color:{color};font-weight:bold">
            {a.spike_probability_score}/100<br>
            <span style="font-size:11px;font-weight:normal">{label}</span>
          </td>
          <td style="padding:10px 8px;color:#27ae60;font-weight:bold">+{a.estimated_upside_pct}%</td>
          <td style="padding:10px 8px;font-size:11px;color:#555">{" | ".join(detail_lines)}</td>
          <td style="padding:10px 8px;font-size:11px;color:#888">{_format_market_cap(a.market_cap)}</td>
        </tr>""")

    return f"""<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;max-width:1100px;margin:0 auto;color:#222">
  <div style="background:#1a1a2e;color:#fff;padding:20px 30px;border-radius:8px 8px 0 0">
    <h2 style="margin:0">📈 Stock Spike Alert — {now_str}</h2>
    <p style="margin:5px 0 0;color:#aaa">{len(alerts)} opportunity{'s' if len(alerts)!=1 else ''} detected</p>
  </div>

  <div style="padding:20px;background:#fafafa;border:1px solid #ddd;border-top:none;border-radius:0 0 8px 8px">
    <table style="width:100%;border-collapse:collapse">
      <thead>
        <tr style="background:#eee;text-align:left">
          <th style="padding:8px">Ticker</th>
          <th style="padding:8px">Price</th>
          <th style="padding:8px">Change</th>
          <th style="padding:8px">Signals</th>
          <th style="padding:8px">Score</th>
          <th style="padding:8px">Est. Upside</th>
          <th style="padding:8px">Details</th>
          <th style="padding:8px">Mkt Cap</th>
        </tr>
      </thead>
      <tbody>
        {"".join(rows)}
      </tbody>
    </table>

    <div style="margin-top:20px;padding:15px;background:#fff3cd;border:1px solid #ffc107;border-radius:6px;font-size:12px;color:#856404">
      <strong>⚠️ Disclaimer:</strong> This is an automated informational tool, not financial advice.
      Stock signals can produce false positives. Always do your own research before investing.
      Past performance of similar patterns does not guarantee future results.
    </div>
  </div>
</body>
</html>"""


# ---------------------------------------------------------------------------
# Email
# ---------------------------------------------------------------------------

def send_email_alert(alerts: list[StockAlert]) -> bool:
    """Send HTML email with all alerts. Returns True on success."""
    cfg = config.email
    if not cfg.is_configured:
        logger.warning("Email not configured — skipping email alert")
        return False

    try:
        msg = MIMEMultipart("alternative")
        tickers = ", ".join(a.ticker for a in alerts[:5])
        if len(alerts) > 5:
            tickers += f" +{len(alerts)-5} more"
        msg["Subject"] = f"🚨 Stock Spike Alert: {tickers}"
        msg["From"] = cfg.sender_email
        msg["To"] = cfg.recipient_email

        html_body = _build_html_email(alerts)
        msg.attach(MIMEText(html_body, "html"))

        with smtplib.SMTP(cfg.smtp_host, cfg.smtp_port) as server:
            if cfg.use_tls:
                server.starttls()
            server.login(cfg.sender_email, cfg.sender_password)
            server.sendmail(cfg.sender_email, cfg.recipient_email, msg.as_string())

        logger.info(f"Email sent to {cfg.recipient_email} with {len(alerts)} alerts")
        return True

    except Exception as e:
        logger.error(f"Failed to send email: {e}")
        return False


# ---------------------------------------------------------------------------
# SMS
# ---------------------------------------------------------------------------

def send_sms_alert(alert: StockAlert) -> bool:
    """Send SMS for a single high-confidence alert via Twilio. Returns True on success."""
    cfg = config.twilio
    if not cfg.is_configured:
        logger.warning("Twilio not configured — skipping SMS alert")
        return False

    try:
        from twilio.rest import Client  # lazy import so app works without twilio installed

        signals_short = ", ".join(s.replace("_", " ") for s in alert.signals_triggered[:3])
        body = (
            f"SPIKE ALERT: ${alert.ticker} @ ${alert.current_price:.2f} "
            f"({alert.change_pct:+.1f}%) | "
            f"Score: {alert.spike_probability_score}/100 | "
            f"Est upside: +{alert.estimated_upside_pct}% | "
            f"Signals: {signals_short}"
        )

        client = Client(cfg.account_sid, cfg.auth_token)
        message = client.messages.create(
            body=body,
            from_=cfg.from_number,
            to=cfg.to_number,
        )
        logger.info(f"SMS sent for {alert.ticker}: SID={message.sid}")
        return True

    except Exception as e:
        logger.error(f"Failed to send SMS for {alert.ticker}: {e}")
        return False
