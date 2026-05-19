import os
from dotenv import load_dotenv

load_dotenv()

# Alpaca credentials
ALPACA_API_KEY = os.getenv("ALPACA_API_KEY", "")
ALPACA_SECRET_KEY = os.getenv("ALPACA_SECRET_KEY", "")
PAPER_TRADING = os.getenv("PAPER_TRADING", "true").lower() == "true"

# Risk management
MAX_DAILY_LOSS_USD = float(os.getenv("MAX_DAILY_LOSS_USD", "200"))   # Stop trading if daily loss exceeds this
RISK_PER_TRADE_PCT = float(os.getenv("RISK_PER_TRADE_PCT", "1.0"))   # % of portfolio risked per trade
MAX_POSITION_SIZE_USD = float(os.getenv("MAX_POSITION_SIZE_USD", "1000"))  # Hard cap per position

# Intraday: auto-close all positions before market close
AUTO_CLOSE_MINUTES_BEFORE_CLOSE = int(os.getenv("AUTO_CLOSE_MINUTES_BEFORE_CLOSE", "15"))

# Webhook server
WEBHOOK_SECRET = os.getenv("WEBHOOK_SECRET", "")  # Optional: validate TradingView requests
SERVER_PORT = int(os.getenv("SERVER_PORT", "8000"))
