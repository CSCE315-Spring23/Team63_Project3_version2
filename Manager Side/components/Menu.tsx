import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';


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
    <table className="table">
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