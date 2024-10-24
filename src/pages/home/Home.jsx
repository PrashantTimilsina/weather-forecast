import Sidebar from "../../components/sidebar/Sidebar";
import Top from "../../components/top/Top";
import "./home.css";
import { UserProvider } from "../../context/Context";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      <UserProvider>
        <Top />
        <Sidebar />
        {/* <Center /> */}
        <Outlet />
      </UserProvider>
    </div>
  );
}

export default Home;
