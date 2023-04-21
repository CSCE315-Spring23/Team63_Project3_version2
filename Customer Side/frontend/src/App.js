
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Customer from './Pages/Customer';
import React, { useState } from 'react';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Customer/>} />
      </Routes>
    </Router>
  );
}

export default App;
