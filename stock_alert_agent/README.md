# Stock Spike Alert Agent

Monitors ~200 high-volatility tickers every 5–15 minutes during market hours and sends you **email + SMS alerts** when multiple pre-spike signals fire on the same stock — so you can get in before the big move.

## How It Works

The agent watches for combinations of these signals:

| Signal | What It Means |
|---|---|
| **PRE_MARKET_SURGE** | Stock up >5% before 9:30 AM — often continues at open |
| **UNUSUAL_VOLUME** | Volume 3x+ the 20-day average — unusual accumulation |
| **GAP_UP** | Stock opens significantly above prior close |
| **52W_HIGH_BREAKOUT** | Price breaking out of a year-long resistance level |
| **SHORT_SQUEEZE_SETUP** | High short interest + a catalyst = squeeze potential |
| **OPTIONS_FLOW_SIGNAL** | Volatility spike proxy — smart money positioning |
| **NEWS_CATALYST** | Recent bullish headline (earnings beat, upgrade, deal) |

Each signal adds points to a **0–100 confidence score**. You get:
- **Email** when score ≥ 65 (default)
- **Email + SMS** when score ≥ 80 (default)

## Setup (10 minutes)

### 1. Install dependencies

```bash
cd stock_alert_agent
pip install -r requirements.txt
```

### 2. Configure credentials

```bash
cp .env.example .env
# then edit .env with your values
```

#### Gmail App Password (for email alerts)

1. Go to [myaccount.google.com](https://myaccount.google.com) → **Security**
2. Enable **2-Step Verification** (required)
3. Search for **App Passwords** → Device: "Other (Custom name)" → name it "StockAgent"
4. Copy the 16-character password into `SENDER_PASSWORD` in `.env`

#### Twilio (for SMS alerts)

1. Sign up free at [twilio.com/try-twilio](https://www.twilio.com/try-twilio) — no credit card needed
2. From the Console Dashboard, copy your **Account SID** and **Auth Token**
3. Get a free Twilio phone number (Messaging → Phone Numbers)
4. Add your real mobile number as a **Verified Caller ID**
5. Fill in `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER`, `TWILIO_TO_NUMBER`

### 3. Test it

```bash
python agent.py --test
```

This runs one scan immediately, prints any alerts found, and does **not** send any emails or texts. Use this to verify your watchlist and signal sensitivity before going live.

### 4. Run the live agent

```bash
python agent.py
```

The agent will:
- Sleep outside of Mon–Fri 4:00 AM – 4:00 PM ET
- Scan every **5 minutes** from 4:00 AM – 10:00 AM ET (pre-market window)
- Scan every **15 minutes** from 10:00 AM – 4:00 PM ET
- Log all activity to `alerts.log`

## Running 24/7

For continuous operation on a server or VPS:

```bash
# Using nohup
nohup python agent.py > agent_stdout.log 2>&1 &

# Or with screen
screen -S stock-agent
python agent.py
# Ctrl+A, D to detach

# Or as a systemd service (Linux)
# See: systemd service file example below
```

## Customizing

**Change the ticker watchlist** — edit `WATCHLIST_TICKERS` in `config.py`

**Lower thresholds for more alerts** — in `.env`:
```
MIN_SCORE_FOR_ALERT=55
PREMARKET_MOVE_PCT=3.0
UNUSUAL_VOLUME_MULTIPLIER=2.0
```

**Tighten thresholds for fewer, higher-confidence alerts**:
```
MIN_SCORE_FOR_ALERT=75
MIN_SCORE_FOR_SMS=90
```

## Disclaimer

This tool is for **informational and educational purposes only**. It is not financial advice. Stock signals can and will produce false positives. Always do your own research before making investment decisions. Past performance of similar patterns does not guarantee future results.
