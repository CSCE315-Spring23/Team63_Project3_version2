
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

# Added decrement from the ingredient_name by the given quantity
def decrement_inventory_by_name(connection, ingredient_name: InventoryItemExtended, quantity: InventoryItemExtended):
    """
    Decreases the quantity of an inventory item by name.
    
    Args:
    - connection: a connection to the database
    - ingredient_name: the name of the inventory item to decrement
    - quantity: the quantity to decrement by
    
    Returns: None
    """
    cursor = connection.cursor()

    # Check if the item exists in the inventory
    cursor.execute("SELECT * FROM inventory_table WHERE item= %s", (ingredient_name,))
    result = cursor.fetchone()
    if result is None:
        raise ValueError(f"No item found in inventory with name '{ingredient_name}'")

    # Decrement the quantity of the item
    current_quantity = result[2]
    if current_quantity < quantity:
        raise ValueError(f"Cannot decrement item '{ingredient_name}' by {quantity} - only {current_quantity} available")
    new_quantity = current_quantity - quantity

    # Update the inventory with the new quantity
    cursor.execute("UPDATE inventory_table SET quantity = %s WHERE item= %s", (new_quantity, ingredient_name))
    connection.commit()