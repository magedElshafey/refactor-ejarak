import React from "react";
import Navbar from "../common/navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../common/footer/Footer";
import Meta from "../../components/common/meta/Meta";
import FixedBtn from "../../components/common/buttons/FixedBtn";
const WebsiteLayout = () => {
  return (
    <div>
      <Meta />
      <FixedBtn />
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
