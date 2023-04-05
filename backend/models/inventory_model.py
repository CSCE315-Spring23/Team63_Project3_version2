import datetime
from backend.entities.inventory_item_extended import InventoryItemExtended


MINIMUM_RESTOCK_THRESHOLD = 20.0
DATE_FORMAT = "%Y-%m-%d"

class InventoryModel():
    def update_inventory_quantity_by_name(self, cursor, itemName: str, quantity: float):
        query = f"UPDATE inventory_table SET quantity = {quantity} WHERE item = '{itemName}';"
        cursor.execute(query)

    def get_inventory_quantity_by_name(self, cursor, itemName: str):
        query = f"SELECT quantity FROM inventory_table WHERE item = '{itemName}';"
        cursor.execute(query)
        return cursor.fetchone()
    
    def get_all_inventory_items(self, cursor):
        query = "SELECT item_id, item, quantity, price, vendor_name, units, expiration_date FROM inventory_table ORDER BY item_id;"
        cursor.execute(query)
        return cursor.fetchall()
    
    def get_all_restock_inventory_items(self, cursor):
        query = f"SELECT item_id, item, quantity FROM inventory_table WHERE CAST(quantity AS DOUBLE PRECISION) < {MINIMUM_RESTOCK_THRESHOLD}"
        cursor.execute(query)
        return cursor.fetchall()
    
    def update_inventory(self, cursor, inventory: InventoryItemExtended):
        date_time = datetime.datetime.strptime(inventory.expiration_date, DATE_FORMAT)
        expiration_date = date_time.date()
        query = f"UPDATE inventory_table SET item = '{inventory.ingredient_name}', quantity = '{inventory.quantity}', vendor_name = '{inventory.vendor_name}', price = '{inventory.price}', expiration_date = '{expiration_date}', units = '{inventory.units}' WHERE item_id = {inventory.item_id};"
        cursor.execute(query)