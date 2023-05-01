import { useState, useEffect } from 'react';
import axios from 'axios';

export interface WeatherData {
  current: {
    weather_icons: string[];
    temperature: number;
    feelslike: number;
    weather_descriptions: string[];
    humidity: number;
  };
}

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const apiKey = 'b4950e1f3ae02c0558d2c5e0190527f3';
      const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=College%20Station&units=imperial&appid=${apiKey}`;

      try {
        const response = await axios.get(endpoint);
        const { data } = response;

        const weatherData: WeatherData = {
          current: {
            weather_icons: [data.weather[0].icon],
            temperature: data.main.temp,
            feelslike: data.main.feels_like,
            weather_descriptions: [data.weather[0].description],
            humidity: data.main.humidity,
          },
        };

        setWeatherData(weatherData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  return { weatherData, loading };
};
