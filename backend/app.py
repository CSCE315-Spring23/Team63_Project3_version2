import json
from flask import Flask, request
from flask_cors import CORS
import os
import psycopg2
from dotenv import load_dotenv
from backend.controllers.custom_encoder import CustomEncoder
from backend.controllers.inventory_controller import get_all_inventory_items, update_inventory_by_item_id
from backend.controllers.manager_controller import get_all_popular_menu_items, get_all_restock_inventory_items, get_inventory_excess_report, get_total_sales_by_date
from backend.controllers.menu_controller import add_new_menu_item, delete_menu_item_by_item_num, edit_menu_item_by_item_num, get_all_menu_items
from backend.controllers.order_controller import get_all_orders_between_dates, get_all_orders_by_date
from backend.controllers.server_controller import checkout_order
from backend.entities.inventory_item import InventoryItem
from backend.entities.inventory_item_extended import InventoryItemExtended

#this database related code has been peer reviewed by the manager of this Project

load_dotenv()  # loads variables from .env file into environment

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'])

# gets variables from environment
database = os.environ.get("DATABASE_NAME")
user_name = os.environ.get("USER_NAME")
password = os.environ.get("USER_PASSWORD")
port = os.environ.get("PORT")
host = os.environ.get("HOST")
connection = psycopg2.connect(database=database, user=user_name, password=password, host=host, port=port)

@app.route("/menu", methods = ['GET'])
def get_menu_items():
    return json.dumps(get_all_menu_items(connection), cls=CustomEncoder), 200

@app.route("/menu/add", methods = ['POST'])
def add_menu_item():
    # TODO: update with actual params
    food = "test-food"
    price = 9.19
    ingredients = [
        InventoryItem("n/a", "test 1", 2.0),
        InventoryItem("n/a", "test 2", 2.0)
    ]
    #print(request.json.get('food'))
    add_new_menu_item(connection, food, price, ingredients)
    return "Added menu item", 201


@app.route("/menu/delete", methods = ['DELETE'])
def delete_menu_item():
    args = request.args.to_dict()
    delete_menu_item_by_item_num(connection, args.get("itemNum"))
    return "Deleted menu item", 200

@app.route("/menu/edit", methods = ['PUT'])
def edit_menu_item():
    # TODO: update with actual params
    item_num = 2
    food = "burrito_marinated-steak"
    price = 9.19
    edit_menu_item_by_item_num(connection, item_num,food,price)
    return "Updated menu item", 200

@app.route("/inventory", methods = ['GET'])
def get_inventory_items():
    return json.dumps(get_all_inventory_items(connection), cls=CustomEncoder), 200

@app.route("/orders/checkout", methods = ['POST'])
def post_order():
    # TODO: update with actual params
    customer_name = "test1"
    employee_id = 1001   
    date = "1111-11-12"  #year-month-date
    itemsList = "chips-and-salsa,chips-and-queso"
    total = 7.18
    inventoryList = [
        # InventoryItem("N/A", "nacho chips", 0.1875),
        # InventoryItem("N/A", "queso", 0.0625),
        # InventoryItem("N/A", "corn salsa", 0.0625),
        # InventoryItem("N/A", "salsa verde", 0.0625),
        InventoryItem("N/A", "sauce containers", 2.0)
    ]
    checkout_order(connection, employee_id, date, customer_name, itemsList, total, inventoryList)
    return "Order checked out", 201

@app.route("/report/orders/sales", methods = ['GET'])
def get_orders_between_dates():
    args = request.args.to_dict()
    return json.dumps(get_all_orders_between_dates(connection, args.get('startDate'), args.get('endDate')), cls=CustomEncoder), 200

@app.route("/report/orders/x", methods = ['GET'])
def get_orders_by_date():
    args = request.args.to_dict()
    return json.dumps(get_all_orders_by_date(connection, args.get('orderDate')), cls=CustomEncoder), 200

@app.route("/report/inventory/restock", methods = ['GET'])
def get_restock_inventory_items():
    return json.dumps(get_all_restock_inventory_items(connection), cls=CustomEncoder), 200

@app.route("/report/orders/z", methods = ['GET'])
def get_z_report():
    args = request.args.to_dict()
    return json.dumps(get_total_sales_by_date(connection, args.get('salesDate'))), 200

@app.route("/report/inventory/excess", methods = ['GET'])
def get_excess_report():
    args = request.args.to_dict()
    return json.dumps(get_inventory_excess_report(connection, args.get('inventoryDate')), cls=CustomEncoder), 200

@app.route("/report/menu/popular", methods = ['GET'])
def get_popular_menu_items():
    args = request.args.to_dict()
    return json.dumps(get_all_popular_menu_items(connection, args.get('startDate'), args.get('endDate')), cls=CustomEncoder), 200

@app.route("/inventory/update", methods=['PUT'])
def restock_inventory():
    # TODO: update with actual params
    item_id = 139205
    ingredient_name = "chipotle sauce"
    quantity = 6.0 
    price = 10.0 
    vendor_name = "heb"
    units = "oz"
    expiration_date = "2023-01-01"
    inventory = InventoryItemExtended(item_id, ingredient_name, quantity, price, vendor_name, units, expiration_date)
    update_inventory_by_item_id(connection, inventory)
    return "Updated inventory item", 200
