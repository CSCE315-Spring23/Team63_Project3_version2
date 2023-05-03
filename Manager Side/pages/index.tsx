import React from 'react';
import Customer from '../pages/Customer';

/**
 * 
 * @returns Navigates to Customer Screen
 */
const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Cabo Grill!</h1>
      <Customer />
    </div>
  );
};

export default HomePage;
