import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen">
      {/* Navbar positioned with some spacing from top like in HeroSection */}
      <div className="px-4 sm:px-6 lg:px-8 pt-4">
      </div>

        <Navbar />
      {/* This is where your page components will render */}
      <Outlet>

      </Outlet>
    </div>
  );
};

export default Layout;
