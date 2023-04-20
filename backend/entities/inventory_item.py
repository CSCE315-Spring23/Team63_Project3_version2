from dataclasses import dataclass

@dataclass
class InventoryItem():
    def __init__(self, item_id: str, ingredient_name: str, quantity: float):
        self.item_id = item_id
        self.ingredient_name = ingredient_name
        self.quantity = quantity

