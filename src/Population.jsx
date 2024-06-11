import React, { useState } from 'react';

const Population = () => {
  const [count, setcount] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!country.trim()) {
      setError('Please enter a country name');
      return;
    }
    try {
      const response = await fetch(`https://get-population.p.rapidapi.com/population/country?country=${country}`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "get-population.p.rapidapi.com",
          "x-rapidapi-key": "3dda37faf4msh5923d66dfe36b6fp11bc7cjsn6446e5073a18" // Replace with your RapidAPI key
        }
      });
      if (!response.ok) {
        throw new Error('Country not found');
      }
      const data = await response.json();
      console.log(data);
      if (data.count) {
        setcount(data.count);
        setError('');
      } else {
        throw new Error('Population data not available');
      }
    } catch (error) {
      setcount('');
      setError(error.message);
    }
  };

  return (
    <div>
      <h1 className="home">Population</h1>
      <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Country Name"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <button type="submit">Get Population</button>
      </form>
      {count && <p>Population of {country} is {count.toLocaleString()}</p>}
      {error && <p>{error}</p>}
    </div>
    </div>
  );
};

export default Population;
