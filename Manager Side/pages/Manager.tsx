// import React from 'react';
// import '../styles/styles.css';
import * as React from 'react';
import { useState, useEffect } from 'react';
import XReport from '@/components/XReport';
import RestockReport from '@/components/RestockReport';
import ExcessReport from '@/components/ExcessReport';
import ZReport from '@/components/ZReport';
import SalesReport from '@/components/SalesReport';
import SalesTogether from '@/components/SalesTogether';
import Inventory from '@/components/Inventory';
import Menu from '@/components/Menu';

import styles from "../styles/Manager.module.css";

import axios from 'axios';

import userData from './user_data.json';

// some imports from ayo
import { useWeather } from '@/hooks/useWeather';
import WeatherBar from '@/components/WeatherBar';

// this code has been peer reviewed by the manager of this Project

function Manager(): JSX.Element {
  const [selection, setSelection] = useState("x_report");
  const { weatherData, loading } = useWeather();

  return (
    <>
    <div className="App">
      {/* Navigation Bar */} 
      <nav>
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
            <a href="#" onClick={() => setSelection("salesTogether")}>Sales Together</a>
          </li>
        </ul>
      </nav>

      {/* Weather Bar */}
      {loading ? <div>Loading weather data...</div> : <WeatherBar weatherData={weatherData} />}

      {/* Main Content */}
      <div>
        
        {selection == "x_report" && <XReport/>}
        {selection == "restock_report" && <RestockReport/>}
        {selection == "sales_report" && <SalesReport/>}
        {selection == "z_report" && <ZReport/>}
        {selection == "excess_report" && <ExcessReport/>}
        {selection == "inventory" && <Inventory/>}
        {selection == "menu" && <Menu/>}
        {selection == 'salesTogether' && <SalesTogether/>}
        </div>

      {/* Footer */}
      {/* <footer>
        <p>&copy; 2023 WFHD. All rights reserved.</p>
      </footer> */}
    </div>
    </>
  );
}

export default Manager;
