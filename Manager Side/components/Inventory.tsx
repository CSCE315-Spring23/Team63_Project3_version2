import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
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

  const [newQuantities, setNewQuantities] = useState<{ [itemId: number]: string }>({});

  const handleQuantityChange = (itemId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    setNewQuantities({
      ...newQuantities,
      [itemId]: event.target.value
    });
  };

  useEffect(() => {

    axios.get('http://127.0.0.1:8000/inventory')
    .then(response => {
        console.log(response.data);
        setInventoryItems(response.data);
    })
    .catch(error => console.log(error));
    
  }, []);

  const handleUpdate = (id: number, quantity: number) => {
    axios.put(`http://127.0.0.1:8000/inventory/update`, { id, quantity })
      .then(response => {
        const updatedInventory = inventoryItems.map(item => {
          if (item.item_id === id) {
            return { ...item, quantity: quantity };
          }
          return item;
        });
        setInventoryItems(updatedInventory);
      })
      .catch(error => console.log(error));

      setNewQuantities({
        ...newQuantities,
        [id]: ''
      });
  };

  return (
    <div>
    <table className="table">
        <thead>
        <tr>
            <th>Ingredient Name</th>
            <th>Quantity</th>
            <th>Update</th>
        </tr>
        </thead>
        <tbody>
        {inventoryItems.map(item => (
            <tr key={item.item_id}>
            <td>{item.ingredient_name}</td>
            <td>{item.quantity}</td>
            <td>
              <input type="text" value={newQuantities[item.item_id] || ''} onChange={event => handleQuantityChange(item.item_id, event)} />
              <button className='inventoryButton' onClick={() => handleUpdate(item.item_id, parseFloat(newQuantities[item.item_id] || '0'))}>Set</button>
            </td>
            </tr>
        ))}
        </tbody>
    </table>
    </div>
  )
}
