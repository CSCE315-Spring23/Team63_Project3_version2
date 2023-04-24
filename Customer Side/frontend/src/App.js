
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Customer from './Pages/customer';
import Menu from './Pages/menu';
import React, { useState } from 'react';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Customer/>} />
        <Route path="/menu" element={<Menu/>} />
      </Routes>
    </Router>
  );
}

export default App;
