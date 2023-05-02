import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';


export default function SalesTogether(){

    interface salesTogetherItem{
        pair: string;
        frequency: number;
    }

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [arr, setArr] = useState<salesTogetherItem[]>([]);

    const handleChangeStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(e.target.value);
    };
    
    const handleChangeEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(e.target.value);
    };


    const handleSalesTogetherClick = () => {
        const url = `http://127.0.0.1:8000/report/menu/popular`;
        
        axios.get(url, {
            params:{
                startDate,
                endDate
            }
        })
        .then(response => {
            console.log(response.data);
            setArr(response.data);
        })
        .catch(error => console.log(error));
      };

    return (

        <div className='flex justify-center w-screen'>
        <div>
          <input
            type="text"
            value={startDate}
            onChange={handleChangeStartDate}
            placeholder="Enter start date"
          />
          <input
            type="text"
            value={endDate}
            onChange={handleChangeEndDate}
            placeholder="Enter end date"
          />
          <button className='reportButton' onClick={handleSalesTogetherClick}>Generate Report</button>
        </div>
        <div>
        <table className="table">
          <thead>
            <tr>
              <th>Menu Items</th>
              <th># of Sales</th>
            </tr>
          </thead>
          <tbody>
            {arr.map((item, index) => (
                item.pair.endsWith("and ") ? null :
                <tr key={index}>
                <td>{item.pair}</td>
                <td>{1 + item.frequency}</td>
                </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

    )
}
