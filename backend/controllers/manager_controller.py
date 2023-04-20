import itertools

from flask import abort

from backend.entities.inventory_item import InventoryItem
from backend.entities.inventory_item_extended import InventoryItemExtended
from backend.entities.order_item import OrderItem
from backend.models.inventory_model import InventoryModel
from backend.models.inventory_status_model import InventoryStatusModel
from backend.models.order_model import OrderModel
from backend.models.z_report_model import ZReportModel

        
def get_total_sales_by_date(connection, sales_date: str) -> float:
    if sales_date is None or len(sales_date) == 0:
        return abort(400, description="Missing required attributes.")

    with connection:
        with connection.cursor() as cursor:  
            total_sales = 0.0
            order = OrderModel()
            res = order.get_total_sales_by_date(cursor, sales_date)
            if len(res) > 0:
                total_sales = res[0]
            
            z_report = ZReportModel()
            existing_record = z_report.get_z_report_by_date(cursor, sales_date)
            if existing_record is None:
                z_report.add_z_report(cursor, sales_date, total_sales)
            else:
                z_report.update_z_report(cursor, sales_date, total_sales)
            
            return total_sales


def get_all_restock_inventory_items(connection) -> list[InventoryItem]:
    with connection:
        with connection.cursor() as cursor:
            inventory = InventoryModel()
            restockInventoryItems: list[InventoryItem] = []
            res = inventory.get_all_restock_inventory_items(cursor)
            for inventory in res:
                restockInventoryItems.append(InventoryItem(inventory[0], inventory[1], inventory[2]))

            return restockInventoryItems
    
def get_inventory_excess_report(connection, inventory_date: str) -> list[InventoryItem]:
    if inventory_date is None or len(inventory_date) == 0:
        return abort(400, description="Missing required attributes.")
    
    with connection:
        with connection.cursor() as cursor:
            inventory = InventoryModel()
            inventory_status = InventoryStatusModel()
            excess_inventory_items: list[InventoryItem] = []
            current_inventory_items: list[InventoryItem] = []
            existing_inventory_items: list[InventoryItem] = []
        
            # get all current inventory items
            inventory_res = inventory.get_all_inventory_items(cursor)
            for inventory in inventory_res:
                current_inventory_items.append(InventoryItem(inventory[0], inventory[1], inventory[2]))

            # get existing inventory snapshot
            inventory_status_res = inventory_status.get_inventory_status_by_date(cursor, inventory_date)
            inventory_status_quantity = inventory_status_res[1].split(":")
            inventory_status_items = inventory_status_res[2].split(":")
            for i in range(0, len(inventory_status_items)):
                existing_inventory_items.append(InventoryItem("N/A", inventory_status_items[i], inventory_status_quantity[i]))

            # excess report
            for i in range(0, len(inventory_status_items)):
                if i < len(current_inventory_items) and current_inventory_items[i].ingredient_name == inventory_status_items[i]:
                    current_quantity = float(current_inventory_items[i].quantity)
                    existing_quantity = float(inventory_status_quantity[i])
                    percentage = ((existing_quantity-current_quantity)/100.0)*100.0
                    
                    if percentage >= 0 and percentage < 10.0:
                        excess_inventory_items.append(current_inventory_items[i])

            return excess_inventory_items

def get_all_popular_menu_items(connection, start_date: str, end_date: str):
    if start_date is None or len(start_date) == 0 or end_date is None or len(end_date) == 0:
        return abort(400, description="Missing required attributes.")

    with connection:
        with connection.cursor() as cursor:
            order = OrderModel()
            orders_list: list[OrderItem] = [] 
            popular_menu_items = {}
            
            order_res = order.get_all_orders_between_dates(cursor, start_date, end_date)
            for order in order_res:
                orders_list.append(OrderItem(order[0], order[1]))

            for order in orders_list:
                menu_items = order.order.split(",")
                combination_menu_items = unique_combinations(list(map(str.strip, menu_items)))
                for combo in combination_menu_items:
                    key = get_key_from_pair(combo)
                    if key in popular_menu_items:
                        popular_menu_items[key] += 1
                    else:
                        popular_menu_items[key] = 1

            sorted_popular_menu_items_by_popularity = sorted(popular_menu_items.items(), key=lambda x:x[1], reverse=True)
            return dict(sorted_popular_menu_items_by_popularity)

def get_key_from_pair(combo: tuple):
    if combo is None or len(combo) != 2:
        return tuple[0]
    else:
        return f"{combo[0]} and {combo[1]}"
    
def unique_combinations(elements: list[str]) -> list[tuple[str, str]]:
    return list(itertools.combinations(elements, 2))