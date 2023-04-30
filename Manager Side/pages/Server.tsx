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
    setCartItems([]);
  };

  const confirmAnotherOrder = () => {
    setIsConfirmed(false);
  };

  return (
    <div className="pos-container">
      <div className="pos-menu">
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
                  <button onClick={() => addToCart(item.food, item.price)}>
                    Add
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pos-receipt">
        <h2>Receipt</h2>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <span>{item.food}</span>
              <span>${item.price.toFixed(2)}</span>
              <button onClick={() => removeFromCart(index)}>X</button>
            </li>
          ))}
        </ul>
        <div className="pos-total">
          <span>Total:</span>
          <span>${calculateTotal().toFixed(2)}</span>
        </div>
        {!isConfirmed ? (
          <div className="pos-confirm">
            <button onClick={confirmOrder}>Confirm Order</button>
          </div>
        ) : (
          <div className="pos-confirmation-message">
            <p>Your order has been confirmed!</p>
            <button onClick={confirmAnotherOrder}>Confirm Another Order</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Server;