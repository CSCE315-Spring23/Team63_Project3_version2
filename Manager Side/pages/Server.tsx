import React, { useState, useEffect } from "react";
import XReport from '@/components/XReport';
import RestockReport from '@/components/RestockReport';
import ExcessReport from '@/components/ExcessReport';
import ZReport from '@/components/ZReport';
import SalesReport from '@/components/SalesReport';
import Inventory from '@/components/Inventory';
import Menu from '@/components/Menu';
import axios from 'axios';
import userData from './user_data.json';
import styles from "../styles/Sever.module.css";

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

  return (
    <div className={styles["pos-container"]}>
      <div className={styles["pos-menu"]}>
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
                <td className={styles["price"]}>${item.price.toFixed(2)}</td>
                <td>
                  <button className={styles["add-button"]} onClick={() => addToCart(item.food, item.price)}>
                    Add
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles["pos-receipt"]}>
        <h2>Receipt</h2>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <span className={styles["item-name"]}>{item.food}</span>
              <span className={styles["item-price"]}>${item.price.toFixed(2)}</span>
              <button className={styles["remove-button"]} onClick={() => removeFromCart(index)}>X</button>
            </li>
          ))}
        </ul>
        <div className={styles["pos-total"]}>
          <span>Total:</span>
          <span className={styles["total-price"]}>${calculateTotal().toFixed(2)}</span>
        </div>
        {!isConfirmed ? (
          <div className={styles["pos-confirm"]}>
            <button className={styles["confirm-button"]} onClick={confirmOrder}>Confirm Order</button>
          </div>
        ) : (
          <div className={styles["pos-confirmation-message"]}>
            <p>Your order has been confirmed!</p>
            <button className={styles["confirm-another-button"]} onClick={confirmAnotherOrder}>Confirm Another Order</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Server;