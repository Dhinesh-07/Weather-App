import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Outlet } from "react-router-dom";
import Home from "./Home";
import WeatherApp from "./WeatherApp";
import Contact from "./Contact";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Counter from "./Counter";
import Population from "./Population";

import "./App.css";

// Layout component that includes Navbar and Outlet for nested routes
const AppLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const App = () => {
  // State to manage authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on component mount
  useEffect(() => {
    // Check local storage for username
    const username = localStorage.getItem('username');
    console.log(username);
    if (username) {
      setIsAuthenticated(true);
    }
  }, []);
  return (
    <Router>
      <Routes>
        {/* The Login route */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
        {/* Protected routes that require authentication */}
        <Route element={isAuthenticated ? <AppLayout /> : <Navigate to="/" />}>
          <Route path="home" element={<Home />} />
          <Route path="weather" element={<WeatherApp />} />
          <Route path="contact" element={<Contact />} />
          <Route path="counter" element={<Counter />} />
          <Route path="population" element={<Population />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
