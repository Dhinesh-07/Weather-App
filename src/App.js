import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Outlet } from "react-router-dom";
import Home from "./Home";
import WeatherApp from "./WeatherApp";
import Contact from "./Contact";
import Navbar from "./Components/Navbar";

import Counter from "./Counter";
import Population from "./Population";

import "./App.css";

const AppLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const App = () => (
  <Router>
    <Routes>
      <Route
        path="/"
        element={<AppLayout />}
      >
        <Route index element={<Home />} />
        <Route path="weather" element={<WeatherApp />} />
        <Route path="contact" element={<Contact />} />
        <Route path="counter" element={<Counter />} />
        <Route path="population" element={<Population />} />
      </Route>
    </Routes>
  </Router>
);

export default App;
