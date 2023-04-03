
import {

  BrowserRouter as Router,
  Routes,
  Route,
}from 'react-router-dom';
import Server from './Pages/server';
import React, { useState } from 'react';


function App() {

  

  return (

    <Router>


      <Routes>

        <Route path="/" element={<Server/>} />



      </Routes>
    </Router>
      

  );
}

export default App;
