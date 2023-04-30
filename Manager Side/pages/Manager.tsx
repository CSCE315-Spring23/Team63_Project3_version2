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
import styles from '../styles/Manager.module.css';

// this code has been peer reviewed by the manager of this Project

function Manager(): JSX.Element {
  const [selection, setSelection] = useState("x_report");

  useEffect(() => {
    const storedSelection = localStorage.getItem('selection');
    if (storedSelection) {
      setSelection(storedSelection);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selection', selection);
  }, [selection]);

  return (
    <div className="App">
      {/* Navigation Bar */} 
      <nav className = {styles.nav_bar}>
        <div className={styles.nav_logo}>
          <a>Manager Eyes Only ┬┴┬┴┤･_├┬┴┬┴</a>
        </div>
        <ul className={styles.nav_links}>
          <li className={styles.nav_item}>
            <a>Settings</a>
            <ul className={styles.dropdown_menu}>
              <li><a href="#" onClick={() => setSelection("inventory")}>Manage Inventory</a></li>
              <li><a href="#" onClick={() => setSelection("menu")}>Update Menu</a></li>
            </ul>
          </li>
          <li className={styles.nav_item}>
            <a>Reports</a>
            <ul className={styles.dropdown_menu}>
              <li><a href="#" onClick={() => setSelection("excess_report")}>Excess Report</a></li>
              <li><a href="#" onClick={() => setSelection("restock_report")}>Restock Report</a></li>
              <li><a href="#" onClick={() => { console.log('Clicked sales report'); setSelection("sales_report")}}>Sales Report</a></li> 
              <li><a href="#" onClick={() => setSelection("x_report")}>X-Report</a></li>
              <li><a href="#" onClick={() => setSelection("z_report")}>Z-Report</a></li>
            </ul>
          </li>
          <li className={styles.nav_item}>
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