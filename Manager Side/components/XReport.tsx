import React from 'react'
import { useState } from 'react';

// this code has been peer reviewed by the manager of this Project to ensure proper functionality

export default function XReport() {
  const [inputValue, setInputValue] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleConfirm = () => {
    alert(`You entered: ${inputValue}`);
  };

  return (
    <div className='flex justify-center w-screen'>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter some text"
        />
        <button onClick={handleConfirm}>Confirm</button>

      </div>

    </div>
  )
}
