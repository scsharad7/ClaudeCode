import logging
import alpaca_client as broker
import config
from signal_parser import TradingSignal

logger = logging.getLogger(__name__)


def _is_market_open() -> bool:
    clock = broker.trading_client.get_clock()
    return clock.is_open


def _daily_loss_breached() -> bool:
    pnl = broker.get_todays_pnl()
    if pnl <= -config.MAX_DAILY_LOSS_USD:
        logger.warning(f"Daily loss limit hit: ${pnl:.2f}. Halting trading.")
        return True
    return False


def _calculate_qty(symbol: str, price: float) -> int:
    account = broker.get_account()
    portfolio_value = float(account.equity)
    risk_budget = min(
        portfolio_value * (config.RISK_PER_TRADE_PCT / 100),
        config.MAX_POSITION_SIZE_USD,
    )
    qty = int(risk_budget / price)
    return max(qty, 1)


def handle_signal(signal: TradingSignal) -> dict:
    if not _is_market_open():
        return {"status": "skipped", "reason": "Market is closed"}

    if _daily_loss_breached():
        return {"status": "halted", "reason": "Daily loss limit reached"}

    symbol = signal.symbol

    if signal.action == "close":
        broker.close_position(symbol)
        return {"status": "closed", "symbol": symbol}

    # Don't stack same-direction positions
    existing = broker.get_position(symbol)
    if existing:
        existing_side = "buy" if float(existing.qty) > 0 else "sell"
        if existing_side == signal.action:
            return {"status": "skipped", "reason": f"Already {signal.action} {symbol}"}
        # Opposite signal → close existing first
        broker.close_position(symbol)

    price = signal.price or broker.get_latest_price(symbol)
    qty = signal.quantity or _calculate_qty(symbol, price)

    if qty < 1:
        return {"status": "skipped", "reason": "Calculated qty < 1 (insufficient funds)"}

    result = broker.place_market_order(symbol, qty, signal.action)
    result["daily_pnl"] = broker.get_todays_pnl()
    return result
