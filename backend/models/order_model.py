class OrderModel:
    def add_order(self, cursor, employee_id: int, date: str, customer_name: str, items_list: str, total: float):
        query = f"INSERT INTO orderhistory (emp_id, date, customer_name, order_history, total) VALUES ('{employee_id}', '{date}', '{customer_name}', '{items_list}', '{str(total)}');"
        cursor.execute(query)

    def get_all_orders_between_dates(self, cursor, start_date: str, end_date: str):
        query = f"SELECT order_history, total FROM orderhistory WHERE date >= '{start_date}' AND date <= '{end_date}';"
        cursor.execute(query)
        return cursor.fetchall()
    
    def get_all_orders_by_date(self, cursor, order_date: str):
        query = f"SELECT order_history, total FROM orderhistory WHERE date = '{order_date}';"
        cursor.execute(query)
        return cursor.fetchall()
    
    def get_total_sales_by_date(self, cursor, sales_date: str):
        query = f"SELECT SUM(total) FROM orderhistory WHERE date = '{sales_date}';"
        cursor.execute(query)
        return cursor.fetchone()