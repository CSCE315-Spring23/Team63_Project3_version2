from flask import abort
from backend.entities.order_item import OrderItem

from backend.models.order_model import OrderModel


def get_all_orders_between_dates(connection, start_date: str, end_date: str) -> list[OrderItem]:
    if start_date is None or len(start_date) == 0 or end_date is None or len(end_date) == 0:
        return abort(400, description="Missing required attributes.")

    with connection:
        with connection.cursor() as cursor:
            order = OrderModel()
            ordersList: list[OrderItem] = []
            res = order.get_all_orders_between_dates(cursor, start_date, end_date)
            for order in res:
                ordersList.append(OrderItem(order[0], order[1]))

            return ordersList

def get_all_orders_by_date(connection, order_date: str) -> list[OrderItem]:
    if order_date is None or len(order_date) == 0:
        return abort(400, description="Missing required attributes.")

    with connection:
        with connection.cursor() as cursor:
            order = OrderModel()
            ordersList: list[OrderItem] = []
            res = order.get_all_orders_by_date(cursor, order_date)
            for order in res:
                ordersList.append(OrderItem(order[0], order[1]))

            return ordersList