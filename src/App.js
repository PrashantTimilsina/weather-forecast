// App.js
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Forecast from "./components/forecast/Forecast";
import Center from "./components/center/Center";
import Charts from "./components/charts/Charts";
import Map from "./components/map/Map";
import Contact from "./components/contact/Contact";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />

        <Route path="home" element={<Home />}>
          <Route index element={<Center />} />

          <Route path="forecast" element={<Forecast />} />
          <Route path="charts" element={<Charts />} />
          <Route path="map" element={<Map />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
