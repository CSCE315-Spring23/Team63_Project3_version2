import React, { useState } from 'react';
import axios from 'axios';

// Define an interface for the sales report data
interface SalesReportData {
  order: string;
  order_total: number;
}

export default function SalesReport() {
  // Define state variables for start date, end date, and array of the sales report data
  const [startDate, setStartDate] = useState('2023-01-01');
  const [endDate, setEndDate] = useState('2023-04-20');
  const [salesData, setSalesData] = useState<SalesReportData[]>([]);

  // Define a function that fetches data from sales table 
  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/report/orders/sales', {
        params: {
          startDate,
          endDate
        }
      });
      // Update the sales report data in the current state 
      setSalesData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Define event handlers for changes in startDate and endDate
  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };
  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  // Define event handler to call fetchData on button Fetch
  const handleButtonClick = () => {
    fetchData();
  };

  return (
    <div>
      <h1>Sales Report</h1>
      <div>
        <label>Start Date:</label>
        <input type="date" value={startDate} onChange={handleStartDateChange} />
      </div>
      <div>
        <label>End Date:</label>
        <input type="date" value={endDate} onChange={handleEndDateChange} />
      </div>
      <button onClick={handleButtonClick}>Fetch Data</button>
      {salesData.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Menu Item</th>
              <th>Total Sales</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((sale, index) => (
              <tr key={index}>
                <td>{sale.order}</td>
                <td>{sale.order_total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}