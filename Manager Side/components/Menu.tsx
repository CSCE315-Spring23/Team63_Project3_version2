import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import styles from '../styles/Manager.module.css';

// this code has been peer reviewed by the manager of this Project

export default function Inventory() {

    interface MenuItem {
        item_number: number;
        food: string;
        price: number;
      }

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    console.log("Before axios request");
    axios.get('http://127.0.0.1:8000/menu')
    .then(response => {
        console.log(response.data);
        setMenuItems(response.data);
    })
    .catch(error => console.log(error));
    console.log("After axios request");
  }, []);

  return (
    <div>
    <table className={styles.table}>
        <thead>
        <tr>
            <th>Food</th>
            <th>Price</th>
        </tr>
        </thead>
        <tbody>
        {menuItems.map(item => (
            <tr key={item.item_number}>
            <td>{item.food}</td>
            <td>${item.price.toFixed(2)}</td>
            </tr>
        ))}
        </tbody>
    </table>
    </div>
  )
}