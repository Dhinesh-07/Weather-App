import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import './WeatherForecast.css';

const WeatherForecast = () => {
  const [city, setCity] = useState('');
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState('');

  const apiKey = '3b6795e80cbf98d62ba2b6846cc167e0';

const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  const getWeatherForecast = async () => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error('City not found. Please try again.');
      }

      const data = await response.json();
      setForecastData(data);
      setError('');
    } catch (err) {
      setForecastData(null);
      setError(err.message);
    }
  };

  return (
    <animated.div style={fadeIn} className="weather-container">
      <h1>Weather Forecast App</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeatherForecast}>Get Forecast</button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {forecastData && (
        <div className="forecast-container">
          <h2>Weather Forecast for {forecastData.city.name}</h2>
          {forecastData.city.population && (
            <p>Population: {new Intl.NumberFormat().format(forecastData.city.population)}</p>
          )}

          <table className="weather-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Temperature (K)</th>
                <th>Weather</th>
              </tr>
            </thead>
            <tbody>
              {forecastData.list.map((forecast, index) => (
                <tr key={index} className="forecast-item">
                  <td>{forecast.dt_txt}</td>
                  <td>{forecast.main.temp}</td>
                  <td>{forecast.weather[0].description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </animated.div>
  );
};

export default WeatherForecast;

