import "./top.css";

function Top() {
  return (
    <div className="top">
      <div className="top-wrapper">
        <div className="top-icon">
          <img
            src="https://cdn.jim-nielsen.com/ios/512/weather-2021-12-07.png?rf=1024"
            alt="Icon"
            className="image"
          />
        </div>
        <div className="title">
          <h1>Weather App</h1>
        </div>
      </div>
    </div>
  );
}

export default Top;
