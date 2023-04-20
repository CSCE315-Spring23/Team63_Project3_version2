from dataclasses import dataclass

@dataclass
class OrderItem():
    def __init__(self, order: str, order_total: float):
        self.order = order
        self.order_total = order_total

