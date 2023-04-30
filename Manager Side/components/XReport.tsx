import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import styles from '../styles/Manager.module.css';

// this code has been peer reviewed by the manager of this Project to ensure proper functionality

export default function XReport() {

  interface xReportItem {
    order: string;
    order_total: number;
  }

  const [xReportItems, setxReportItems] = useState<xReportItem[]>([]);


  const [inputValue, setInputValue] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleXReportClick = () => {
    const url = `http://127.0.0.1:8000/report/orders/x?orderDate=${inputValue}`;
    console.log("Before axios request");
    axios.get(url)
    .then(response => {
        console.log(response.data);
        setxReportItems(response.data);
    })
    .catch(error => console.log(error));
    console.log("After axios request");
  };

  return (
    <div className='flex justify-center w-screen'>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter a date"
        />
        <button onClick={handleXReportClick}>Generate Report</button>
      </div>
      <div>
    <table className={styles.table}>
        <thead>
        <tr>
            <th>Order</th>
            <th>Total</th>
        </tr>
        </thead>
        <tbody>
        {xReportItems.map(item => (
            <tr key={uuidv4()}>
            <td>${item.order}</td>
            <td>${item.order_total.toFixed(2)}</td>
            </tr>
        ))}
        </tbody>
    </table>
    </div>
    
    </div>
  )
}
