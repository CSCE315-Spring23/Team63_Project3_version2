import React, { useState } from 'react';
import axios from 'axios';

// Define an interface for the excess report data
interface ExcessReportData {
  item_id: string;
  ingredient_name: string;
  quantity: number;
}

export default function ExcessReport() {
  // Define state variables for inventoryDate and array of the excess report data
  const [inventoryDate, setInventoryDate] = useState('2023-04-20');
  const [excessData, setExcessData] = useState<ExcessReportData[]>([]);

  // Define a function that fetches data from inventory table
  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/report/inventory/excess', {
        params: {
          inventoryDate
        }
      });
      // Update the excess report data in the current state
      setExcessData(response.data);
      // Conditional if nothing is returned from the inventoryDate
      if (response.data.length === 0) {
        window.alert('No data found for the selected date.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Define event handler for changes in inventoryDate
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInventoryDate(event.target.value);
  };

  // Define event handler to call fetchData on button Fetch
  const handleButtonClick = () => {
    fetchData();
  };

  return (
    <div>
      <h1>Excess Report</h1>
      <div>
        <label>Inventory Date:</label>
        <input type="date" value={inventoryDate} onChange={handleDateChange} />
      </div>
      <button onClick={handleButtonClick}>Fetch Data</button>
      {excessData.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Ingredient Name</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {excessData.map((excess) => (
              <tr key={excess.item_id}>
                <td>{excess.item_id}</td>
                <td>{excess.ingredient_name}</td>
                <td>{excess.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
