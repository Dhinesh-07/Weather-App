import React, { useState } from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from "./Login";
import { Register } from "./Register";
import Home from "./Home";
import WeatherApp from "./WeatherApp";
import Contact from "./Contact";
import Navbar from "./Components/Navbar";
import Counter from "./Counter";
import Population from "./Population";

// Create a layout for authenticated users
const AppLayout = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="home" element={<Home />} />
      <Route path="weather" element={<WeatherApp />} />
      <Route path="contact" element={<Contact />} />
      <Route path="counter" element={<Counter />} />
      <Route path="population" element={<Population />} />
    </Routes>
  </>
);

function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Set login state to true on successful login
  };

  return (
    <div className="App App-asa">  {/* Add App-asa class here */}
      <Router>
        {
          isLoggedIn ? (
            <AppLayout />  // Show AppLayout after successful login
          ) : (
            currentForm === "login" ? (
              <Login onFormSwitch={toggleForm} onLoginSuccess={handleLoginSuccess} />
            ) : (
              <Register onFormSwitch={toggleForm} />
            )
          )
        }
      </Router>
    </div>
  );
}

export default App;
