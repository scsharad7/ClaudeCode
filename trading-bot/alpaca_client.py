import logging
from alpaca.trading.client import TradingClient
from alpaca.trading.requests import MarketOrderRequest, GetOrdersRequest
from alpaca.trading.enums import OrderSide, TimeInForce, QueryOrderStatus
from alpaca.data.historical import StockHistoricalDataClient
from alpaca.data.requests import StockLatestQuoteRequest
import config

logger = logging.getLogger(__name__)

trading_client = TradingClient(
    config.ALPACA_API_KEY,
    config.ALPACA_SECRET_KEY,
    paper=config.PAPER_TRADING,
)

data_client = StockHistoricalDataClient(
    config.ALPACA_API_KEY,
    config.ALPACA_SECRET_KEY,
)


def get_account():
    return trading_client.get_account()


def get_latest_price(symbol: str) -> float:
    req = StockLatestQuoteRequest(symbol_or_symbols=symbol)
    quote = data_client.get_stock_latest_quote(req)
    return float(quote[symbol].ask_price or quote[symbol].bid_price)


def get_position(symbol: str):
    try:
        return trading_client.get_open_position(symbol)
    except Exception:
        return None


def get_all_positions():
    return trading_client.get_all_positions()


def place_market_order(symbol: str, qty: int, side: str) -> dict:
    order_side = OrderSide.BUY if side == "buy" else OrderSide.SELL
    req = MarketOrderRequest(
        symbol=symbol,
        qty=qty,
        side=order_side,
        time_in_force=TimeInForce.DAY,
    )
    order = trading_client.submit_order(req)
    logger.info(f"Order placed: {side} {qty} {symbol} | id={order.id}")
    return {"id": str(order.id), "symbol": symbol, "side": side, "qty": qty, "status": str(order.status)}


def close_position(symbol: str):
    try:
        result = trading_client.close_position(symbol)
        logger.info(f"Closed position: {symbol}")
        return result
    except Exception as e:
        logger.warning(f"Could not close {symbol}: {e}")
        return None


def close_all_positions():
    try:
        trading_client.close_all_positions(cancel_orders=True)
        logger.info("All positions closed.")
    except Exception as e:
        logger.error(f"Error closing all positions: {e}")


def get_todays_pnl() -> float:
    account = get_account()
    return float(account.equity) - float(account.last_equity)
