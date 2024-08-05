import React from "react";
import Navbar from "../common/navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../common/footer/Footer";
import ProgressBar from "../../components/common/ProgressBar";
const WebsiteLayout = () => {
  return (
    <div>
      <Navbar bg="bg-[#e7ebe7]" />
      {
        <div className="main">
          <Outlet />
        </div>
      }
      <Footer isHome={false} />
    </div>
  );
};

export default WebsiteLayout;
