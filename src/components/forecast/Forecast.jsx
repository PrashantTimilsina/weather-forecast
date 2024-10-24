import { useData } from "../../context/Context";
import Loader from "../loader/Loader";
import "./forecast.css";
import { useState } from "react";

async function fetchCityCoordinates(cityName) {
  const res = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=0da0693ec1e5f623e7e8558e47fec000`
  );
  const data = await res.json();
  if (data.length > 0) {
    const { lat, lon } = data[0];
    return { lat, lon };
  } else {
    alert("City not found!");
    return null;
  }
}

async function fetchForecast(lat, lon) {
  const res = await fetch(
    `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=0da0693ec1e5f623e7e8558e47fec000&units=metric`
  );
  const data = await res.json();
  return res.ok ? data.list : alert("Failed to fetch forecast data");
}

function Forecast() {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState([]);
  const { isLoading, setIsLoading } = useData();

  const handleSearch = async () => {
    setIsLoading(true);
    const coordinates = await fetchCityCoordinates(city);

    if (coordinates) {
      const forecastData = await fetchForecast(
        coordinates.lat,
        coordinates.lon
      );
      setForecast(forecastData);
      setCity("");
    }
    setIsLoading(false);
  };
  function handleKeyPress(e) {
    if (e.code === "Enter") {
      handleSearch(forecast);
      setCity("");
    }
  }

  return (
    <div className="forecast-container">
      <h2 className="forecast-title"> Weather Forecast</h2>
      <div className="search-bar">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="search-input"
          spellCheck="false"
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
      {isLoading && <Loader />}

      <ul className="forecast-list">
        {forecast.slice(0, 5).map((entry, index) => (
          <li key={index} className="forecast-item">
            <p className="forecast-date">{entry.dt_txt}</p>
            <p className="forecast-temp">Temperature: {entry.main.temp}°C</p>
            <p className="forecast-description">
              {entry.weather[0].description}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`}
              alt="weather icon"
              className="forecast-icon"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Forecast;
