from flask import abort
from backend.entities.inventory_item import InventoryItem
from backend.models.menu_model import MenuModel
from backend.entities.menu_item import MenuItem


def get_all_menu_items(connection) -> list[MenuItem]:
    with connection:
        with connection.cursor() as cursor:
            menu = MenuModel()
            res = menu.get_all_menu_items(cursor)
            if len(res) == 0:
                return []
                        
            menuItems = []
            for item in res:
                menuItems.append(MenuItem(itemNumber=item[0], food=item[1], price=item[2], ingredients=item[3]))
            return menuItems
 
def delete_menu_item_by_item_num(connection, item_num: int):
    if item_num is None:
        return abort(400, description="Missing required attributes.")
    
    with connection:
        with connection.cursor() as cursor:
            menu = MenuModel()
            menu.delete_menu_item(cursor, item_num)

def edit_menu_item_by_item_num(connection, item_num: int, name: str, price:float):
    if item_num is None or name is None or len(name) == 0 or price <= 0:
        return abort(400, description="Missing required attributes.")
    
    with connection:
        with connection.cursor() as cursor:
            menu = MenuModel()
            menu.edit_menu_item(cursor, item_num, name, price)

def add_new_menu_item(connection, food: str, price: float, ingredients: str):
    if food is None or len(food) == 0 or price <=0 or ingredients is None or len(ingredients) == 0:
        return abort(400, description="Missing required attributes.")
    
    with connection:
        with connection.cursor() as cursor:
            menu = MenuModel()
            item_num = 0

            res = menu.get_max_item_num(cursor)
            if res is not None and len(res) != 0:
                item_num = int(res[0]) + 1

            menu.add_menu_item(cursor, item_num, food, price, ingredients)
