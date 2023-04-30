import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import styles from '../styles/Manager.module.css';
// this code has been peer reviewed by the manager of this Project

export default function Inventory() {

    interface InventoryItem {
        item_id: number;
        ingredient_name: string;
        quantity: number;
        price: number;
        vendor_name: string;
        units: string;
        expiration_date: string;
      }

  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);

  useEffect(() => {
    console.log("Before axios request");
    axios.get('http://127.0.0.1:8000/inventory')
    .then(response => {
        console.log(response.data);
        setInventoryItems(response.data);
    })
    .catch(error => console.log(error));
    console.log("After axios request");
  }, []);

  return (
    <div>
    <table className={styles.table}>
        <thead>
        <tr>
            <th>Ingredient Name</th>
            <th>Quantity</th>
            <th>Price</th>
        </tr>
        </thead>
        <tbody>
        {inventoryItems.map(item => (
            <tr key={item.item_id}>
            <td>{item.ingredient_name}</td>
            <td>{item.quantity}</td>
            <td>${item.price.toFixed(2)}</td>
            </tr>
        ))}
        </tbody>
    </table>
    </div>
  )
}