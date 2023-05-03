import unittest
from unittest.mock import patch
from app import app

class TestCheckout(unittest.TestCase):
    
    @patch('app.checkout_order')
    def test_checkout_success(self, mock_checkout_order):
        # Create a fake request object to simulate the form data and JSON payload
        request_data = {'employee_id': '123', 'order_date': '2022-01-01', 'customer_name': 'John Doe'}
        json_data = {'items_list': [
            {'itemNumber': 1, 'food': 'burrito_chili-rubbed-chicken', 'price': 8.79,
             'ingredients': ['0.175:black beans', '0.127:spring mix', '0.1005:mozzarella cheese',
                             '0.09375:pico de gallo', '0.1875:onions', '0.09924:jalapeno peppers',
                             '0.08724:cilantro', '0.155:sour cream', '0.105:ranch', '0.115:chipotle sauce',
                             '0.115:black olives', '0.089:lime', '0.109:italian dressing', '1.0:large tortilla',
                             '1.0:paper bags', '1.0:aluminum foil', '1.0:gloves', '0.098:lime juice',
                             '0.155:chicken']},
            {'itemNumber': 2, 'food': 'quesadilla_grilled-chicken', 'price': 9.99,
             'ingredients': ['0.118:chicken', '0.085:spinach', '0.09375:pico de gallo',
                             '0.075:mozzarella cheese', '0.065:cheddar cheese', '0.0475:sour cream',
                             '0.075:guacamole', '1.0:large tortilla', '1.0:paper bags', '1.0:aluminum foil',
                             '1.0:gloves']}],
            'total': 18.78, 'inventory_list': ['burrito_chili-rubbed-chicken', 'quesadilla_grilled-chicken']}
        with patch('flask.request', form=request_data, json=json_data, method='POST'):
            # Call the checkout() function
            response = app.checkout()
            
            # Check that checkout_order() was called for each item in the items_list
            self.assertEqual(mock_checkout_order.call_count, len(json_data['items_list']))
            
            # Check that the response is a success message with a status code of 200
            self.assertEqual(response[0], 'Order(s) processed successfully')
            self.assertEqual(response[1], 200)
            
if __name__ == '__main__':
    unittest.main()
