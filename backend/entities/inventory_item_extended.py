from dataclasses import dataclass

from backend.entities.inventory_item import InventoryItem

@dataclass
class InventoryItemExtended(InventoryItem):
    def __init__(self, item_id: str, ingredient_name: str, quantity: float, price: float, vendor_name: str, units: str, expiration_date: str):
        InventoryItem.__init__(self, item_id, ingredient_name, quantity)
        self.price = price
        self.vendor_name = vendor_name
        self.units = units
        self.expiration_date = expiration_date

