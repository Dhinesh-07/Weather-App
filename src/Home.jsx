import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Ensure you have a CSS file for styling

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to My Portfolio</h1>
      <p className="home-intro">
        Below are some of the JavaScript projects I've been working on:
      </p>

      <div className="home-projects">
        <div className="home-project">
          <h2>Weather App</h2>
          <p>
            Explore the Weather App to get real-time weather updates for any location. It’s designed to provide you with current weather conditions and forecasts.
          </p>
          <Link to="/weather">
            <button className="home-button">Explore Weather App</button>
          </Link>
        </div>

        <div className="home-project">
          <h2>Population Finder</h2>
          <p>
            Discover the Population Finder tool to access and analyze demographic data. This tool helps in understanding population statistics and trends.
          </p>
          <Link to="/population">
            <button className="home-button">Explore Population Finder</button>
          </Link>
        </div>

        <div className="home-project">
          <h2>Counter</h2>
          <p>
            The Counter application is a simple yet effective tool for counting numbers. It’s useful for various counting tasks and keeping track of quantities.
          </p>
          <Link to="/counter">
            <button className="home-button">Explore Counter</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
