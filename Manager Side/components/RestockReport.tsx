import React, { useState } from 'react';
import axios from 'axios';

// Define an interface for the restock report data
interface RestockReportData {
  item_id: string;
  ingredient_name: string;
  quantity: number;
}

export default function RestockReport() {
  // Define state variables for array of the restock report data
  const [restockData, setRestockData] = useState<RestockReportData[]>([]);

  // Define a function that fetches data from inventory table
  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/report/inventory/restock');
      // Update the restock report data in the current state
      setRestockData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Define event handler to call fetchData on button fetch
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
