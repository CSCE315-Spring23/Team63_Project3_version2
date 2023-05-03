from flask import abort
from backend.entities.inventory_item import InventoryItem
from backend.models.inventory_model import InventoryModel
from backend.models.inventory_status_model import InventoryStatusModel
from backend.models.order_model import OrderModel

def checkout_order(connection, employee_id: int, order_date: str, customer_name: str, itemsList: str, total: float, inventoryList: list[InventoryItem]):
    #button on UI should be disabled until user enters all fields
    #if no error, UI should set total price to 0 and text = ""
    if employee_id is None or len(customer_name) == 0 or len(order_date) == 0 or len(itemsList) == 0 or total == 0.0:
        return abort(400, description="Missing required attributes.")

    with connection:
        with connection.cursor() as cursor:
            # add to order history
            order = OrderModel()
            order.add_order(cursor, employee_id, order_date, customer_name, itemsList, total)

            # update inventory status
            update_inventory(cursor, inventoryList)
            
            # add inventory snapshot
            add_inventory_snapshot(cursor, order_date)

def update_inventory(cursor, inventoryList: list[InventoryItem]):
    inventory = InventoryModel()
    for item in inventoryList:
        update_quantity = 0.0
        current_quantity = inventory.get_inventory_quantity_by_name(cursor, item.ingredient_name)[0]
        if current_quantity - item.quantity < 0:
            update_quantity = 0.0
        else:
            update_quantity = current_quantity - item.quantity
        inventory.update_inventory_quantity_by_name(cursor, item.ingredient_name, update_quantity)

def add_inventory_snapshot(cursor, order_date: str):
    inventory = InventoryModel()
    # current inventory
    res = inventory.get_all_inventory_items(cursor)
    inventoryItems = []
    for inventory in res:
        inventoryItems.append(InventoryItem(inventory[0], inventory[1], inventory[2]))

    # check for existing inventory for a given date
    inventory_status = InventoryStatusModel()
    current_inventory_status = inventory_status.get_inventory_status_by_date(cursor, order_date)

    # manipulate inventory status
    if current_inventory_status is None:
        inventory_status.add_inventory_status(cursor, order_date, inventoryItems)
    else:
        inventory_status.update_inventory_status(cursor, order_date, inventoryItems)