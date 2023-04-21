import React, { useState } from 'react';
import axios from 'axios';

interface SalesReportData {
  date: string;
  total_sales: number;
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
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map(sale => (
            <tr key={sale.date}>
              <td>{sale.date}</td>
              <td>{sale.total_sales}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}