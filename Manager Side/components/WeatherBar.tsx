import React from 'react';
import styles from '../styles/WeatherBar.module.css';
import { WeatherData } from '@/hooks/useWeather';

interface WeatherBarProps {
    weatherData: WeatherData | null;
  }

const WeatherBar: React.FC<WeatherBarProps> = ({ weatherData }) => {
  if (!weatherData) {
    return null;
  }

  const { weather_icons, temperature, feelslike, weather_descriptions, humidity } = weatherData?.current ?? {};
  if (!weather_icons) {
    return null;
  }

  return (
    <div className={styles.weatherBar}>
      <div className="weather-info">
        <img src={weather_icons[0]} alt={weather_descriptions[0]} />
      </div>
      <div className="separator"></div>
      <div className="weather-info">Temperature: {temperature}°</div>
      <div className="separator"></div>
      <div className="weather-info">Feels like: {feelslike}°</div>
      <div className="separator"></div>
      <div className="weather-info">Description: {weather_descriptions[0]}</div>
      <div className="separator"></div>
      <div className="weather-info">Humidity: {humidity}%</div>
    </div>
  );
};

export default WeatherBar;
