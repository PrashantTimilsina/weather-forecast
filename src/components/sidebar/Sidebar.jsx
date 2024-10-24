import "./sidebar.css";
import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from "@mui/icons-material/BarChart";
import FloodIcon from "@mui/icons-material/Flood";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { useNavigate } from "react-router-dom";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  function handleOpen() {
    setIsOpen((isOpen) => !isOpen);
  }
  function hanldeSideBarWrapper() {
    setIsOpen(false);
  }
  return (
    <>
      {isOpen ? (
        <CloseIcon className="mbl-icon close" onClick={() => handleOpen()} />
      ) : (
        <DensitySmallIcon className="mbl-icon " onClick={() => handleOpen()} />
      )}
      <div className={`sidebar ${isOpen ? "sidebarOpen" : ""}`}>
        <div className="sidebar-wrapper" onClick={hanldeSideBarWrapper}>
          <div className="home" onClick={() => navigate("/home")}>
            <HomeIcon className="icon" />
            <h2>Home</h2>
          </div>
          <div className="home" onClick={() => navigate("/home/charts")}>
            <BarChartIcon className="icon" />
            <h2>See chart</h2>
          </div>
          <div className="home" onClick={() => navigate("/home/forecast")}>
            <FloodIcon className="icon" />
            <h2>Weather Forecast</h2>
          </div>
          <div className="home" onClick={() => navigate("/home/map")}>
            <LocationOnIcon className="icon" />
            <h2>Map</h2>
          </div>
          <div className="home" onClick={() => navigate("/home/contact")}>
            <ContactMailIcon className="icon" />
            <h2>Contact</h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
