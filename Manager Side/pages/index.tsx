/*export default function Home() {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}*/


import React from 'react';
import Customer from '../pages/Customer';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Cabo Grill!</h1>
      <Customer />
    </div>
  );
};

export default HomePage;