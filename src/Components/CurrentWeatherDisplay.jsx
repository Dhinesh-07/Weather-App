import React from 'react';
import '../Styles/currentweather.css';

const CurrentWeatherDisplay = ({ currentWeather, error }) => {
  const kelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed();
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!currentWeather) {
    return <p></p>;
  }
//new method to display the current date and time remove the speed and add the icon of the weather


 return (
     <div className="CurrentWeatherDisplay">
       <h1>Current Weather</h1>
       <h2>{currentWeather.name}</h2>
       <p className="Country">Country: {currentWeather.sys.country}</p>
       <p className="temperature">Temperature: {kelvinToCelsius(currentWeather.main.temp)} °C</p>
       <p className="description">Description: {currentWeather.weather[0].description}</p>
       <p className="WindSpeed">WindSpeed: {currentWeather.wind.speed}</p>

        <img src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`} alt="Weather Icon" />
     </div>
  );
};

export default CurrentWeatherDisplay;
