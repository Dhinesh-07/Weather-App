import React from 'react';
import '../Styles/WeatherForecast.css';

const WeatherDisplay = ({ weatherData, error }) => {
const kelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed();
  };
  if (error) {
    return <p>{error}</p>;
  }

  if (!weatherData) {
    return <p></p>;
  }

  if (!weatherData.list || weatherData.list.length === 0) {
    return <p>No weather data available for this city.</p>;
  }




  return (
    <div>
    <h1>Weather Forecasting </h1>
  <p>Population of the City {weatherData.city.name} = {weatherData.city.population}</p>
        <table className="weather-table">

          <tr>
            <th>Date & Time</th>
            <th>Temperature (°C)</th>
            <th>Logo</th>
            <th>Description</th>
          </tr>


          {weatherData.list.map((item) => (
            <tr key={item.dt} className="forecast-item">
              <td>{new Date(item.dt_txt).toLocaleString()}</td>
            {/*  <td>{new Date(item.dt_txt).getFullYear()}</td>
             <td>{new Date(item.dt_txt).getDate()}</td>
             <td>{new Date(item.dt_txt).getMonth()+1}</td>
             <td>{new Date(item.dt_txt).getDay()+1}</td> */}
              <td>{kelvinToCelsius(item.main.temp)} °C</td>
               <td> <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt="Weather Icon" /> </td>
              <td>{item.weather[0].description}</td>
              <td>{item.population}</td>

            </tr>
          ))}

      </table>
    </div>
  );
};

export default WeatherDisplay;
