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

  const iconUrl = `https://openweathermap.org/img/wn/${weather_icons[0]}@2x.png`;

  return (
    <div className={styles.weatherBar}>
      <div className={styles.weatherIcon}>
        <img src={iconUrl} alt={weather_descriptions[0]} />
      </div>
      <div className={styles.separator}></div>
      <div className={styles.weatherInfo}>Temperature: {temperature}°</div>
      <div className={styles.separator}></div>
      <div className={styles.weatherInfo}>Feels like: {feelslike}°</div>
      <div className={styles.separator}></div>
      <div className={styles.weatherInfo}>Description: {weather_descriptions[0]}</div>
      <div className={styles.separator}></div>
      <div className={styles.weatherInfo}>Humidity: {humidity}%</div>
    </div>
  );
  
};

export default WeatherBar;
