import React, { useState } from "react";
import WeatherCard from "./WeatherCard";
import "./App.css";

const cities = [
  { name: "Delhi", value: "Delhi,IN" },
  { name: "Mumbai", value: "Mumbai,IN" },
  { name: "Bangalore", value: "Bangalore,IN" },
  { name: "Hyderabad", value: "Hyderabad,IN" },
  { name: "Chennai", value: "Chennai,IN" },
  { name: "Kolkata", value: "Kolkata,IN" },
  { name: "Ahmedabad", value: "Ahmedabad,IN" },
  { name: "Pune", value: "Pune,IN" },
  { name: "Jaipur", value: "Jaipur,IN" },
  { name: "Lucknow", value: "Lucknow,IN" }
];

function App() {
  const [selectedCity, setSelectedCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "422428236eb2cc4926871c1c306f3b32";

  const getWeather = async () => {
    if (!selectedCity) {
      setError("Please select a city.");
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();

      if (data.cod === 200) {
        setWeather(data);
        setError("");
      } else {
        setError(data.message || "City not found.");
        setWeather(null);
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching weather data.");
      setWeather(null);
    }
  };

  return (
    <div className="app">
      <div className="container">
        
        <div className="box input-box">
          <h1>🌤️ Weather App</h1>

          <div className="dropdown-box">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">-- Select an Indian City --</option>
              {cities.map((city) => (
                <option key={city.name} value={city.value}>
                  {city.name}
                </option>
              ))}
            </select>
            <button onClick={getWeather}>Get Weather</button>
          </div>

          {error && <p className="error">{error}</p>}
        </div>

        
        <div className="box output-box">
          {weather ? (
            <WeatherCard data={weather} />
          ) : (
            <p className="placeholder">Select a city to view weather.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
