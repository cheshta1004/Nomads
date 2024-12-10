import React, { useState, useEffect } from 'react';
import './Weather.css'; // Assuming you have a CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloudSun, faCloud, faCloudRain, faSmog} from '@fortawesome/free-solid-svg-icons';

const Weather = ({ city }) => {
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);

  const API_KEY = 'e2376cb791f74cf680263659240812'; // Replace with your WeatherAPI.com key
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7`;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error fetching weather data: ${response.statusText}`);
        }
        const data = await response.json();
        const weatherData = data.forecast.forecastday.map((day) => ({
          date: day.date,
          maxTemp: day.day.maxtemp_c,
          minTemp: day.day.mintemp_c,
          conditionText: day.day.condition.text,
          conditionCode: day.day.condition.code,
        }));
        setForecast(weatherData);
        setError(null);
      } catch (error) {
        console.error('Error fetching weather:', error);
        setError(error.message);
      }
    };
  
    if (city) {
      fetchWeather();
    }
  }, [city, url]); 
  
  const getWeatherIcon = (code) => {
    
    switch (code) {
      case 1000: // Clear sky
        return <FontAwesomeIcon icon={faSun} />;
      case 1003: // Partly cloudy
        return <FontAwesomeIcon icon={faCloudSun} />;
      case 1006: // Cloudy
        return <FontAwesomeIcon icon={faCloud} />;
      case 1009: // Overcast
        return <FontAwesomeIcon icon={faCloud} />;
      case 1063: // Light rain
        return <FontAwesomeIcon icon={faCloudRain} />;
      // ... other conditions and their corresponding icons
      default:
        return <FontAwesomeIcon icon={faSmog} />;
    }
  };

  return (
    <div className="weather-container">
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="forecast-list">
          {forecast.map((day) => (
            <div className="forecast-card" key={day.date}>
              <div className="date">{day.date}</div>
              {getWeatherIcon(day.conditionCode)}
              <div className="temp-range">
                Max: {day.maxTemp}°C <br />
                Min: {day.minTemp}°C
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Weather;

