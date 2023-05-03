import React from 'react';
// import '../styles/styles.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import userData from './user_data.json';

// this code has been peer reviewed by the manager of this Project

function Staff(): JSX.Element {


  const router = useRouter();


  const change_page1 = () => {

    router.push('http://localhost:3000/Manager');

  };

  const change_page2 = () => {

    router.push('http://localhost:3000/Server');

  };

  return (
    <div className="App">
      {/* Navigation Bar */} 
      <nav>
        <div className="nav-logo">
          <a>Staff Login - Let's make someone's day a perfect day!</a>
        </div>
        <ul className="nav-links">
          <li className="nav-item">
            <a>Who are you?</a>
            <ul className="dropdown-menu">
              <li><a href="#" onClick={() => change_page1()}>Manager</a></li>
              <li><a href="#" onClick={() => change_page2()}>Server</a></li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Staff;