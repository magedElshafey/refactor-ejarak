import React from "react";
import Navbar from "../common/navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../common/footer/Footer";
import ProgressBar from "../../components/common/ProgressBar";
import Meta from "../../components/common/meta/Meta";
const WebsiteLayout = () => {
  return (
    <div>
      <Meta />
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
