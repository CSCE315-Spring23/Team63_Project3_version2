import React, { useState } from 'react';
import axios from 'axios';

interface ExcessReportData {
  item_id: string;
  ingredient_name: string;
  quantity: number;
}

export default function ExcessReport() {
  const [inventoryDate, setInventoryDate] = useState('2023-04-20');
  const [excessData, setExcessData] = useState<ExcessReportData[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/report/inventory/excess', {
        params: {
          inventoryDate
        }
      });
      setExcessData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInventoryDate(event.target.value);
  };

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
        <table>
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
