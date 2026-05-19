from pydantic import BaseModel, field_validator
from typing import Literal, Optional


class TradingSignal(BaseModel):
    action: Literal["buy", "sell", "close"]
    symbol: str
    price: Optional[float] = None        # For reference only; we use market orders
    quantity: Optional[int] = None       # Override auto-sizing if provided
    strategy: Optional[str] = None       # Tag from TradingView alert name

    @field_validator("symbol")
    @classmethod
    def uppercase_symbol(cls, v: str) -> str:
        return v.upper().strip()

    @field_validator("action")
    @classmethod
    def lowercase_action(cls, v: str) -> str:
        return v.lower().strip()
