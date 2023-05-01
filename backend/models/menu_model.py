
from backend.entities.inventory_item import InventoryItem


class MenuModel():
    def get_all_menu_items(self, cursor) -> list[list]:
        cursor.execute("SELECT * FROM menu2 ORDER BY itemnum;")
        menu_items = cursor.fetchall()
        return menu_items
    
    def get_max_item_num(Self, cursor) -> tuple:
        cursor.execute("SELECT MAX(itemnum) FROM menu2;")
        return cursor.fetchone()

    def delete_menu_item(self, cursor, item_num: int):
        cursor.execute(f"DELETE FROM menu2 WHERE itemnum={item_num};")

    def edit_menu_item(self, cursor, item_num: int, name:str, price:float):
        cursor.execute(f"UPDATE menu2 SET food = '{name}', price = {price} WHERE itemnum={item_num};")

    def add_menu_item(self, cursor, item_num: int, food: str, price: float, ingredients: str):
        query = f"INSERT INTO menu2 (itemnum, food, price, ingridents) VALUES ({item_num}, '{food}', {price}, '{ingredients}');"
        cursor.execute(query)

    def get_formatted_str(self, ingredient: InventoryItem):
        return f"{ingredient.ingredient_name}:{ingredient.quantity}"
    
    def get_ingredient_str_from_list(self, ingredients: list[InventoryItem]):
        return ",".join(map(self.get_formatted_str, ingredients))
    
