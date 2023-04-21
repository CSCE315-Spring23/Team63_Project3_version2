import React from 'react';
// import '../styles/styles.css';
import { useState, useEffect } from 'react';
import XReport from '@/components/XReport';
import RestockReport from '@/components/RestockReport';
import ExcessReport from '@/components/ExcessReport';
import ZReport from '@/components/ZReport';
import SalesReport from '@/components/SalesReport';
import Inventory from '@/components/Inventory';
import Menu from '@/components/Menu';
import axios from 'axios';

import userData from './user_data.json';

function Manager(): JSX.Element {
  const [selection, setSelection] = useState("x_report");

  return (
    <div className="App">
      {/* Navigation Bar */} 
      <nav>
        <div className="nav-logo">
          <a>Manager Eyes Only ┬┴┬┴┤･_├┬┴┬┴</a>
        </div>
        <ul className="nav-links">
          <li className="nav-item">
            <a>Settings</a>
            <ul className="dropdown-menu">
              <li><a href="#" onClick={() => setSelection("inventory")}>Manage Inventory</a></li>
              <li><a href="#" onClick={() => setSelection("menu")}>Update Menu</a></li>
            </ul>
          </li>
          <li className="nav-item">
            <a>Reports</a>
            <ul className="dropdown-menu">
              <li><a href="#" onClick={() => setSelection("excess_report")}>Excess Report</a></li>
              <li><a href="#" onClick={() => setSelection("restock_report")}>Restock Report</a></li>
              <li><a href="#" onClick={() => { console.log('Clicked sales report'); setSelection("sales_report")}}>Sales Report</a></li> 
              <li><a href="#" onClick={() => setSelection("x_report")}>X-Report</a></li>
              <li><a href="#" onClick={() => setSelection("z_report")}>Z-Report</a></li>
            </ul>
          </li>
          <li className="nav-item">
            <a href="#">Order History</a>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div>
        {selection == "x_report" && <XReport/>}
        {selection == "restock_report" && <RestockReport/>}
        {selection == "sales_report" && <SalesReport/>}
        {selection == "z_report" && <ZReport/>}
        {selection == "excess_report" && <ExcessReport/>}
        {selection == "inventory" && <Inventory/>}
        {selection == "menu" && <Menu/>}
        </div>

      {/* Footer */}
      {/* <footer>
        <p>&copy; 2023 WFHD. All rights reserved.</p>
      </footer> */}
    </div>
  );
}

export default Manager;