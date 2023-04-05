from backend.entities.inventory_item import InventoryItem


class InventoryStatusModel:
    def get_inventory_status_by_date(self, cursor, date: str):
        query = f"SELECT * FROM inventory_status WHERE date = '{date}';"
        cursor.execute(query)
        return cursor.fetchone()
    
    def add_inventory_status(self, cursor, date: str, inventoryList: list[InventoryItem]):
        item = self.get_ingredients_name(inventoryList)
        quantity = self.get_ingredients_quantity(inventoryList)
        query = f"INSERT INTO inventory_status (date, quantity, item) VALUES ('{date}', '{quantity}', '{item}');"
        cursor.execute(query)

    def update_inventory_status(self, cursor, date: str, inventoryList: list[InventoryItem]):
        item = self.get_ingredients_name(inventoryList)
        quantity = self.get_ingredients_quantity(inventoryList)
        query = f"UPDATE inventory_status SET quantity = '{quantity}', item = '{item}' WHERE date = '{date}';"
        cursor.execute(query)

    def get_ingredients_name(self, inventoryList: list[InventoryItem]) -> str:
        return ':'.join(str(x.ingredient_name) for x in inventoryList)
    
    def get_ingredients_quantity(self, inventoryList: list[InventoryItem]) -> str:
        return ':'.join(str(x.quantity) for x in inventoryList)