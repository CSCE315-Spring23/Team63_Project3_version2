import React, { useState, useEffect } from "react";
import axios from 'axios';
import userData from './user_data.json';
import serverStyles from '../styles/Server.module.css';
import { useWeather } from '@/hooks/useWeather';
import WeatherBar from '@/components/WeatherBar';


interface FoodItem {
  itemNumber: number;
  food: string;
  price: number;
}

interface CartItem {
  food: string;
  price: number;
}

const Server = () => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    // Fetch the food data from the API endpoint
    fetch("http://127.0.0.1:8000/menu")
      .then((response) => response.json())
      .then((data) => setFoodItems(data));
  }, []);

  const addToCart = (food: string, price: number) => {
    const newCartItem = { food, price };
    setCartItems([...cartItems, newCartItem]);
  };

  // Removes specified item from the receipt area
  const removeFromCart = (index: number) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  const calculateTotal = (): number => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const confirmOrder = () => {
    setIsConfirmed(true);
  
    const date = prompt("Enter order date (YYYY-MM-DD):");
    const employeeId = prompt("Enter employee ID:");
    const customerName = prompt("Enter customer name:");
  
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        employee_id: employeeId,
        order_date: date,
        customer_name: customerName,
        items_list: cartItems,
        total: calculateTotal(),
        inventory_list: []
      })
    };
  
    fetch("/checkout", options)
      .then(response => {
        // Handle the response
        console.log("Server got the message", response);
      })
      .catch(error => {
        // Handle the error
      });
  
    setCartItems([]);
  };

  const confirmAnotherOrder = () => {
    setIsConfirmed(false);
  };

  const { weatherData, loading } = useWeather();

  return (
    
    <div className={serverStyles["pos-container"]}>
      {/* Weather Bar */}
      {loading ? <div>Loading weather data...</div> : <WeatherBar weatherData={weatherData} />}
      <div className={serverStyles["pos-menu"]}>
        <h2>Menu</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {foodItems.map((item) => (
              <tr key={item.itemNumber}>
                <td>{item.food}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <button className={serverStyles["pos-menu-btn"]} onClick={() => addToCart(item.food, item.price)}>
                    Add
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={serverStyles["pos-receipt"]}>
        <h2>Receipt</h2>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <span>{item.food}</span>
              <span>${item.price.toFixed(2)}</span>
              <button className={serverStyles["pos-receipt-btn"]} onClick={() => removeFromCart(index)}>X</button>
            </li>
          ))}
        </ul>
        <div className={serverStyles["pos-total"]}>
          <span>Total:</span>
          <span>${calculateTotal().toFixed(2)}</span>
        </div>
        {!isConfirmed ? (
          <div className={serverStyles["pos-confirm"]}>
            <button className={serverStyles["pos-confirm-btn"]} onClick={confirmOrder}>Confirm Order</button>
          </div>
        ) : (
          <div className={serverStyles["pos-confirmation-message"]}>
            <p>Your order has been confirmed!</p>
            <button className={serverStyles["pos-confirm-btn"]} onClick={confirmAnotherOrder}>Confirm Another Order</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Server;