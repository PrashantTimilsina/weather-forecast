import { useState } from "react";
import { useData } from "../../context/Context";
import "./center.css";
import Loader from "../loader/Loader";
function Center() {
  const [query, setQuery] = useState("");
  const { weatherData, weatherIcon, fetchSearchedData, isLoading } = useData();
  console.log(weatherIcon);
  console.log(weatherData);
  function convertUnixToTime(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }
  function handleSearch(city) {
    fetchSearchedData(city);
  }
  function handleKeyPress(e) {
    if (e.code === "Enter") {
      handleSearch(query);
      setQuery("");
    }
  }

  const sunrise = weatherData?.sys?.sunrise;
  const riseTime = convertUnixToTime(sunrise);
  const sunset = weatherData?.sys?.sunset;
  const setTime = convertUnixToTime(sunset);
  const visibility = weatherData?.visibility / 1000;

  return (
    <div className="center">
      {isLoading && <Loader />}
      <div className="centerWrapper">
        <div className="searchBar">
          <input
            type="text"
            placeholder="Enter the city"
            className="text"
            value={query}
            onKeyDown={handleKeyPress}
            spellCheck="false"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="search"
            onClick={() => {
              handleSearch(query);
              setQuery("");
            }}
          >
            Search
          </button>
        </div>
        <div className="hero-section">
          <h1 className="cityName">
            {" "}
            {weatherData?.name}, {weatherData?.sys?.country}
          </h1>
          <div className="heroWrapper">
            <div className="cloud">
              <img src={weatherIcon} alt="" className="cloudimg" />
              <h2>Clouds</h2>
              <h2>{weatherData?.clouds?.all}%</h2>
            </div>
            <div className="humidity">
              <h2>Humidity</h2>
              <h2>{weatherData?.main?.humidity}%</h2>
            </div>
            <div className="humidity">
              <h2>Temp</h2>
              <h2>{weatherData?.main?.temp}°C</h2>
            </div>
            <div className="humidity">
              <h2>Feels like</h2>
              <h2>{weatherData?.main?.feels_like}°C</h2>
            </div>
            <div className="humidity">
              <h2>Rain (last 1h)</h2>
              <h2>
                {weatherData?.rain?.["1h"]
                  ? `${weatherData.rain["1h"]} mm`
                  : "No rain"}
              </h2>
            </div>
            {weatherData?.weather?.length > 0 && (
              <div className="humidity">
                <h2>Weather Condition</h2>
                <h2>{weatherData.weather[0].description}</h2>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="section2">
        <div className="sectionWrapper">
          <div className="sunrise">
            <h2>Sunrise time</h2>
            <h2>{riseTime} AM</h2>
          </div>
          <div className="sunrise">
            <h2>Sunset time</h2>
            <h2>{setTime} PM</h2>
          </div>
          <div className="sunrise">
            <h2>Visibility</h2>
            <h2>{visibility} KM</h2>
          </div>
          <div className="sunrise">
            <h2>Wind speed</h2>
            <h2>{weatherData?.wind?.speed} m/s</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Center;
