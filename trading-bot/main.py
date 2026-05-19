import logging
import hmac
import hashlib
from contextlib import asynccontextmanager
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse

import config
import alpaca_client as broker
from signal_parser import TradingSignal
from trade_manager import handle_signal

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
)
logger = logging.getLogger(__name__)

scheduler = AsyncIOScheduler()


def auto_close_job():
    logger.info("Auto-close: closing all intraday positions before market close.")
    broker.close_all_positions()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Close all positions at 3:45 PM ET (15 min before 4 PM close)
    scheduler.add_job(
        auto_close_job,
        CronTrigger(hour=15, minute=45, timezone="America/New_York"),
    )
    scheduler.start()
    logger.info("Scheduler started. Bot is live.")
    yield
    scheduler.shutdown()


app = FastAPI(title="TradingView-Alpaca Bot", lifespan=lifespan)


def _verify_webhook_secret(body: bytes, signature: str) -> bool:
    if not config.WEBHOOK_SECRET:
        return True  # Secret not configured; skip validation
    expected = hmac.new(config.WEBHOOK_SECRET.encode(), body, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, signature)


@app.post("/webhook")
async def receive_signal(request: Request):
    body = await request.body()

    signature = request.headers.get("X-Signature", "")
    if config.WEBHOOK_SECRET and not _verify_webhook_secret(body, signature):
        raise HTTPException(status_code=401, detail="Invalid webhook signature")

    try:
        payload = await request.json()
        signal = TradingSignal(**payload)
    except Exception as e:
        logger.error(f"Bad webhook payload: {e}")
        raise HTTPException(status_code=422, detail=str(e))

    logger.info(f"Signal received: {signal}")
    result = handle_signal(signal)
    logger.info(f"Result: {result}")
    return JSONResponse(content=result)


@app.get("/status")
async def status():
    account = broker.get_account()
    positions = broker.get_all_positions()
    return {
        "equity": float(account.equity),
        "cash": float(account.cash),
        "daily_pnl": broker.get_todays_pnl(),
        "positions": [
            {"symbol": p.symbol, "qty": float(p.qty), "unrealized_pl": float(p.unrealized_pl)}
            for p in positions
        ],
        "paper_trading": config.PAPER_TRADING,
    }


@app.post("/close-all")
async def close_all():
    broker.close_all_positions()
    return {"status": "all positions closed"}
