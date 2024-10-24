import { createContext, useContext, useEffect, useState } from "react";

const userContext = createContext();
// const key=
function UserProvider({ children }) {
  const [weatherData, setWeatherData] = useState([]);
  const [weatherIcon, setWeatherIcon] = useState("");
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchSearchedData(city) {
    setIsLoading(true);
    const res = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=0da0693ec1e5f623e7e8558e47fec000`
    );
    const data = await res.json();

    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      fetchWeatherData(lat, lon);
      setIsLoading(false);
    } else {
      alert("No city");
      setIsLoading(false);
    }
  }

  async function fetchWeatherData(lat, lon) {
    setIsLoading(true);
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0da0693ec1e5f623e7e8558e47fec000&units=metric`
    );
    const data = await res.json();
    if (!res.ok) return;

    setWeatherData(data);
    setIsLoading(false);
    const Icon = data?.weather[0]?.icon;
    setWeatherIcon(`https://openweathermap.org/img/wn/${Icon}@2x.png`);
    const chartEntry = {
      name: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
    };

    setChartData((prev) => [...prev, chartEntry]);
  }
  useEffect(function () {
    navigator.geolocation.getCurrentPosition(function (position) {
      const { latitude, longitude } = position.coords;

      fetchWeatherData(latitude, longitude);
    });
  }, []);

  return (
    <userContext.Provider
      value={{
        weatherData,
        weatherIcon,
        fetchSearchedData,
        chartData,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </userContext.Provider>
  );
}
function useData() {
  const context = useContext(userContext);
  if (context === undefined) {
    throw new Error("Cities context was used outside the userProvider");
  }
  return context;
}
export { UserProvider, useData };
