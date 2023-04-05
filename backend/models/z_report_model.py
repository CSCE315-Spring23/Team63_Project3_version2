class ZReportModel:
    def get_z_report_by_date(self, cursor, date: str):
        query = f"SELECT * FROM z_report WHERE date = '{date}';"
        cursor.execute(query)
        return cursor.fetchone()
    
    def add_z_report(self, cursor, date: str, z_entry: float):
        query = f"INSERT INTO z_report(date, z_entry) VALUES('{date}', {z_entry});"
        cursor.execute(query)

    def update_z_report(self, cursor, date: str, z_entry: float):
        query = f"UPDATE z_report SET z_entry = {z_entry} WHERE date = '{date}';"
        cursor.execute(query)