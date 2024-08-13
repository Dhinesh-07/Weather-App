import React, { Component } from 'react';
import CityInput from './Components/CityInput';
import WeatherDisplay from './Components/WeatherDisplay';
import CurrentWeatherDisplay from './Components/CurrentWeatherDisplay';


class WeatherApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      weatherData: null,
      currentWeather: null,
      error: ''
    };
  }

  handleCityChange = (city) => {
    this.setState({ city });
  };

  handleFetchWeather = (weatherData) => {
    this.setState({ weatherData, error: '' });
  };

  handleFetchCurrentWeather = (currentWeather) => {
    this.setState({ currentWeather, error: '' });
  };

  render() {
    const { city, weatherData, currentWeather, error } = this.state;
    return (
      <>
      <h1 className="home">Weather App</h1>
      <div class="weather-container">
        
        <br/>

        <br/>
        <CityInput
          city={city}
          onCityChange={this.handleCityChange}
          onFetchWeather={this.handleFetchWeather}
          onFetchCurrentWeather={this.handleFetchCurrentWeather}
        />
        {currentWeather && <CurrentWeatherDisplay
                  currentWeather={currentWeather}
                  error={error}
                />}
        <WeatherDisplay
          weatherData={weatherData}
          error={error}
        />
      </div>
      </>
    );
  }
}

export default WeatherApp;
