import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ZReport() {


  const [zReportTotal, setzReportTotal] = useState<number>(0);


  const [inputValue, setInputValue] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleZReportClick = () => {
    const url = `http://127.0.0.1:8000/report/orders/z?salesDate=${inputValue}`;
    console.log("Before axios request");
    axios.get(url)
    .then(response => {
        console.log(response.data);
        setzReportTotal(response.data);
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
        <button className='reportButton' onClick={handleZReportClick}>Generate Report</button>
      </div>
      <div className="zReportDisplay">
        Total Sales: {zReportTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
      </div>
    </div>
  )
}

