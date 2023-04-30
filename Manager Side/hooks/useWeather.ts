import { useState, useEffect } from 'react';
import axios from 'axios';

// export interface WeatherData {
//   [key: string]: any;
// }
// Add the export keyword before the interface declaration
export interface WeatherData {
    request: object;
    location: object;
    current: {
      weather_icons: string[];
      temperature: number;
      feelslike: number;
      weather_descriptions: string[];
      humidity: number;
    };
  }
  

// Cache object to store weather data
const cache = {
  data: null as WeatherData | null,
  lastFetch: null as number | null,
};

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const apiKey = '105cf124b1a759f46bc425bfe1e2d90d';
      const endpoint = `http://api.weatherstack.com/current?access_key=${apiKey}&query=College Station&units=f`;

      // Check if cache is valid (not older than 10 minutes)
      const now = new Date().getTime();
      const cacheValid = cache.lastFetch && (now - cache.lastFetch) < 10 * 60 * 1000;

      if (cacheValid) {
        // Use cached data
        setWeatherData(cache.data);
        setLoading(false);
      } else {
        try {
          const response = await axios.get(endpoint);
          // Update cache with new data and timestamp
          cache.data = response.data;
          cache.lastFetch = new Date().getTime();

          setWeatherData(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      }
    };

    fetchWeatherData();
  }, []);

  return { weatherData, loading };
};
