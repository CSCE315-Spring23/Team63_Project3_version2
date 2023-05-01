/*export default function Home() {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}*/


import React from 'react';
import GoogleAuth from '../pages/GoogleAuth';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to My App</h1>
      <GoogleAuth />
    </div>
  );
};

export default HomePage;