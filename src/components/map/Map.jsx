import "./map.css";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useData } from "../../context/Context";

const Map = () => {
  const { weatherData } = useData();

  const lat = weatherData?.coord?.lat;
  const lon = weatherData?.coord?.lon;
  const city = weatherData?.name;

  if (!lat || !lon) return <p>Loading map...</p>;

  return (
    <MapContainer className="full-height-map" center={[lat, lon]} zoom={10}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[lat, lon]}>
        <Popup className="popup">
          Weather in {city}: {weatherData.main.temp}°C
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
