import React, { useState } from 'react';
import axios from 'axios';

interface SalesReportData {
  order: string;
  order_total: number;
}

export default function SalesReport() {
  const [startDate, setStartDate] = useState('2023-01-01');
  const [endDate, setEndDate] = useState('2023-04-20');
  const [salesData, setSalesData] = useState<SalesReportData[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/report/orders/sales', {
        params: {
          startDate,
          endDate
        }
      });
      // if(response.status >= 200 && response.status < 300) {
      //   console.log(response.status);
      //   console.log(response.data);
      //   for (const item of response.data) {
      //     console.log(`Item name: ${item.order}`);
      //     console.log(`Total sales: ${item.order_total}`);
      //     console.log('---');
      //   }
      // }
      // else {
      //   console.error('request failed with status code ${response.status}');
      // }
      setSalesData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

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
        <table>
          <thead>
            <tr>
              <th>Menu Item</th>
              <th>Total Sales</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((sale) => (
              <tr key={sale.order}>
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