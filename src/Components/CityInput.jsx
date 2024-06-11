import React, { useState } from 'react';

const CityInput = ({ onCityChange, onFetchWeather, onFetchCurrentWeather }) => {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');

  const handleFetchWeather = async () => {
    const apiKey = '3b6795e80cbf98d62ba2b6846cc167e0';
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error('City not found. Please try again.');
      }

      const data = await response.json();
      setError('');
      onFetchWeather(data);

      // Fetch current weather after fetching the weather forecast
      const currentWeatherResponse = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );

      if (!currentWeatherResponse.ok) {
        throw new Error('City not found. Please try again.');
      }

      const currentWeatherData = await currentWeatherResponse.json();
      onFetchCurrentWeather(currentWeatherData);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={handleInputChange}
      />
      <button onClick={handleFetchWeather}>Get Weather Forecast</button>

      {error && <p>{error}</p>}
    </div>
  );
};

export default CityInput;
