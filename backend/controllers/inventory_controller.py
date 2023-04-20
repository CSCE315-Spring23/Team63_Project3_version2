
from flask import abort

from backend.entities.inventory_item_extended import InventoryItemExtended
from backend.models.inventory_model import InventoryModel

DATE_FORMAT = "%Y-%m-%d"

def get_all_inventory_items(connection) -> list[InventoryItemExtended]:
    with connection:
        with connection.cursor() as cursor:
            inventory = InventoryModel()
            res = inventory.get_all_inventory_items(cursor)
            if len(res) == 0:
                return []
            
            inventory_items = []
            for item in res:
                inventory_items.append(InventoryItemExtended(item[0], item[1], item[2], item[3], item[4], item[5], item[6].strftime(DATE_FORMAT)))
            return inventory_items
 
def update_inventory_by_item_id(connection, inventory_item: InventoryItemExtended):
    if inventory_item is None:
        return abort(400, description="Missing required attributes.")
    
    with connection:
        with connection.cursor() as cursor:
            inventory = InventoryModel()
            inventory.update_inventory(cursor, inventory_item)