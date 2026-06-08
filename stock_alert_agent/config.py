"""
Configuration module for Stock Spike Alert Agent.
All settings are loaded from environment variables with sensible defaults.
"""

import os
from dataclasses import dataclass, field
from dotenv import load_dotenv

load_dotenv()


@dataclass
class EmailConfig:
    smtp_host: str = field(default_factory=lambda: os.getenv("SMTP_HOST", "smtp.gmail.com"))
    smtp_port: int = field(default_factory=lambda: int(os.getenv("SMTP_PORT", "587")))
    sender_email: str = field(default_factory=lambda: os.getenv("SENDER_EMAIL", ""))
    sender_password: str = field(default_factory=lambda: os.getenv("SENDER_PASSWORD", ""))
    recipient_email: str = field(
        default_factory=lambda: os.getenv("RECIPIENT_EMAIL", "steverorgers12@gmail.com")
    )
    use_tls: bool = True

    @property
    def is_configured(self) -> bool:
        return bool(self.sender_email and self.sender_password)


@dataclass
class TwilioConfig:
    account_sid: str = field(default_factory=lambda: os.getenv("TWILIO_ACCOUNT_SID", ""))
    auth_token: str = field(default_factory=lambda: os.getenv("TWILIO_AUTH_TOKEN", ""))
    from_number: str = field(default_factory=lambda: os.getenv("TWILIO_FROM_NUMBER", ""))
    to_number: str = field(default_factory=lambda: os.getenv("TWILIO_TO_NUMBER", ""))

    @property
    def is_configured(self) -> bool:
        return bool(
            self.account_sid
            and self.auth_token
            and self.from_number
            and self.to_number
        )


@dataclass
class AlertThresholds:
    # Minimum spike_probability_score to trigger any alert
    min_score_for_alert: int = field(
        default_factory=lambda: int(os.getenv("MIN_SCORE_FOR_ALERT", "65"))
    )
    # Minimum score to also send SMS (on top of email)
    min_score_for_sms: int = field(
        default_factory=lambda: int(os.getenv("MIN_SCORE_FOR_SMS", "80"))
    )
    # Hours to wait before re-alerting the same ticker
    alert_cooldown_hours: int = field(
        default_factory=lambda: int(os.getenv("ALERT_COOLDOWN_HOURS", "4"))
    )
    # Pre-market move % to flag as a signal
    premarket_move_pct: float = field(
        default_factory=lambda: float(os.getenv("PREMARKET_MOVE_PCT", "5.0"))
    )
    # Volume multiple vs 20-day avg to flag as unusual
    unusual_volume_multiplier: float = field(
        default_factory=lambda: float(os.getenv("UNUSUAL_VOLUME_MULTIPLIER", "3.0"))
    )
    # Gap-up % at open to flag
    gap_up_pct: float = field(
        default_factory=lambda: float(os.getenv("GAP_UP_PCT", "3.0"))
    )
    # % within 52-week high to flag breakout
    breakout_nearness_pct: float = field(
        default_factory=lambda: float(os.getenv("BREAKOUT_NEARNESS_PCT", "1.5"))
    )
    # Short interest ratio (days-to-cover) above which to consider squeeze potential
    short_squeeze_dtc_threshold: float = field(
        default_factory=lambda: float(os.getenv("SHORT_SQUEEZE_DTC_THRESHOLD", "5.0"))
    )
    # IV spike multiple vs prior IV to flag options flow
    iv_spike_multiplier: float = field(
        default_factory=lambda: float(os.getenv("IV_SPIKE_MULTIPLIER", "1.5"))
    )


@dataclass
class ScanConfig:
    # Scan interval during pre-market + first 30 min of trading (minutes)
    premarket_scan_interval_minutes: int = field(
        default_factory=lambda: int(os.getenv("PREMARKET_SCAN_INTERVAL_MINUTES", "5"))
    )
    # Scan interval during regular market hours (minutes)
    regular_scan_interval_minutes: int = field(
        default_factory=lambda: int(os.getenv("REGULAR_SCAN_INTERVAL_MINUTES", "15"))
    )
    # Start of pre-market monitoring (24h ET, e.g. 4 = 4:00 AM ET)
    premarket_start_hour: int = field(
        default_factory=lambda: int(os.getenv("PREMARKET_START_HOUR", "4"))
    )
    # End of intensive monitoring window (24h ET)
    intensive_end_hour: int = field(
        default_factory=lambda: int(os.getenv("INTENSIVE_END_HOUR", "10"))
    )
    # End of market monitoring (24h ET)
    market_close_hour: int = field(
        default_factory=lambda: int(os.getenv("MARKET_CLOSE_HOUR", "16"))
    )
    # Timezone for schedule
    timezone: str = field(
        default_factory=lambda: os.getenv("TIMEZONE", "America/New_York")
    )
    # Path to the alerts log file
    log_file: str = field(
        default_factory=lambda: os.getenv("LOG_FILE", "alerts.log")
    )


@dataclass
class AppConfig:
    email: EmailConfig = field(default_factory=EmailConfig)
    twilio: TwilioConfig = field(default_factory=TwilioConfig)
    thresholds: AlertThresholds = field(default_factory=AlertThresholds)
    scan: ScanConfig = field(default_factory=ScanConfig)


# Singleton config instance
config = AppConfig()


def validate_config() -> list[str]:
    """Return a list of human-readable warnings about missing / misconfigured settings."""
    warnings: list[str] = []
    if not config.email.sender_email:
        warnings.append("SENDER_EMAIL is not set — email alerts will be disabled.")
    if not config.email.sender_password:
        warnings.append("SENDER_PASSWORD is not set — email alerts will be disabled.")
    if not config.twilio.account_sid:
        warnings.append("TWILIO_ACCOUNT_SID is not set — SMS alerts will be disabled.")
    if not config.twilio.auth_token:
        warnings.append("TWILIO_AUTH_TOKEN is not set — SMS alerts will be disabled.")
    if not config.twilio.from_number:
        warnings.append("TWILIO_FROM_NUMBER is not set — SMS alerts will be disabled.")
    if not config.twilio.to_number:
        warnings.append("TWILIO_TO_NUMBER is not set — SMS alerts will be disabled.")
    return warnings


# ---------------------------------------------------------------------------
# Ticker universe: ~200 high-volatility, high-liquidity names
# Includes S&P 500 mega-caps, NASDAQ 100 names, high-beta tech, biotech,
# meme stocks, crypto-adjacent, and recent high-volume movers.
# ---------------------------------------------------------------------------

WATCHLIST_TICKERS = [
    # Mega-cap tech
    "AAPL", "MSFT", "NVDA", "AMZN", "GOOGL", "GOOG", "META", "TSLA", "AVGO", "ORCL",
    # High-beta tech / AI plays
    "AMD", "SMCI", "MSTR", "PLTR", "CRWD", "SNOW", "DDOG", "NET", "ZS", "PANW",
    "MDB", "GTLB", "BILL", "HUBS", "SHOP", "SPOT", "TTD", "RBLX", "U", "COIN",
    "HOOD", "MELI", "SE", "GRAB", "BIDU", "JD", "PDD", "BABA",
    # Semiconductors
    "TSM", "ASML", "AMAT", "KLAC", "LRCX", "MRVL", "QCOM", "TXN", "INTC", "MU",
    "ON", "WOLF", "SWKS", "MPWR", "ENPH", "SEDG", "FSLR",
    # Cloud / SaaS
    "CRM", "NOW", "ADBE", "WDAY", "VEEV", "ZM", "OKTA", "TWLO", "DOCU", "BOX",
    "ESTC", "APPN", "BRZE", "DOMO", "GTLB", "BILL", "HUBS",
    # Fintech / Payments
    "SQ", "PYPL", "V", "MA", "FIS", "GPN", "AFRM", "UPST", "LC", "SOFI",
    "OPEN", "OPFI", "DAVE",
    # Biotech / Pharma high-movers
    "MRNA", "BNTX", "NVAX", "SGEN", "BMRN", "ALNY", "IONS", "SRPT", "RARE",
    "ACAD", "INCY", "NKTR", "ARWR", "BEAM", "EDIT", "CRSP", "NTLA",
    "FATE", "VRTX", "REGN", "BIIB", "GILD", "ILMN", "IDXX", "DXCM",
    # EV / Clean Energy
    "RIVN", "LCID", "NIO", "XPEV", "LI", "WKHS", "ACHR", "JOBY",
    "CHPT", "BLNK", "EVGO", "PLUG", "BE", "FCEL", "BLDP",
    # Meme / High-short-interest
    "GME", "AMC", "CLOV", "SPCE", "WOOF", "RDDT", "APP",
    "TLRY", "SNDL", "HEXO", "APHA", "CGC", "ACB", "OGI",
    # ETFs (leveraged - used for market-wide spike detection)
    "TQQQ", "SQQQ", "SPXL", "UPRO", "TECL", "SOXL",
    # Defense / Industrials with sudden-move potential
    "LMT", "RTX", "NOC", "GD", "BA", "CAT", "DE",
    # Energy
    "XOM", "CVX", "SLB", "HAL", "OXY", "COP", "DVN", "FANG",
    # Financials
    "JPM", "BAC", "GS", "MS", "C", "WFC", "BLK", "SCHW",
    # Consumer / Retail disruptors
    "AMZN", "WMT", "COST", "TGT", "ETSY", "W", "CVNA",
    # Healthcare
    "UNH", "CVS", "CI", "HUM", "TDOC", "HIMS",
    # Crypto / Bitcoin proxies
    "MARA", "RIOT", "HUT", "BTBT", "CLSK", "CIFR", "IREN",
    # Recent high-activity names
    "ARM", "SMCI", "HPE", "DELL", "LUMN", "CLFD", "VIAV", "CSCO",
    "ANET", "NTAP", "PSTG", "NTNX", "NFLX", "DIS", "WBD",
    "SNAP", "PINS", "LYFT", "UBER", "DASH", "ABNB",
    "EXPE", "BKNG", "TRIP", "CCL", "RCL", "NCLH", "AAL", "UAL", "DAL",
    "LUV", "HA", "IONQ", "RKLB", "LUNR", "ASTS", "CELH",
]

# Deduplicate while preserving order
_seen = set()
WATCHLIST_TICKERS = [
    t for t in WATCHLIST_TICKERS if not (t in _seen or _seen.add(t))
]
