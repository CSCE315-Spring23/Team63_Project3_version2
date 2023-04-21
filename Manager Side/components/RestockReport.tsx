import React, { useState } from 'react';
import axios from 'axios';

interface RestockReportData {
  item_id: string;
  ingredient_name: string;
  quantity: number;
}

export default function RestockReport() {
  const [restockData, setRestockData] = useState<RestockReportData[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/report/inventory/restock');
      // if (response.status >= 200 && response.status < 300) {
      //   console.log(response.status);
      //   console.log(response.data);
      // }
      // else {
      //   console.error('request failed with status code ${response.status}');
      // }
      setRestockData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonClick = () => {
    fetchData();
  };

  return (
    <div>
      <h1>Restock Report</h1>
      <button onClick={handleButtonClick}>Fetch Data</button>
      {restockData.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Ingredient Name</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {restockData.map((restock) => (
              <tr key={restock.item_id}>
                <td>{restock.item_id}</td>
                <td>{restock.ingredient_name}</td>
                <td>{restock.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );  
}
