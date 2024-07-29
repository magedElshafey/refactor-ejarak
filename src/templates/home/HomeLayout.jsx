import React from "react";
import { Outlet } from "react-router-dom";
import heroImg from "../../assets/riad.png";
import Hero from "../../components/common/Hero";
import Navbar from "../common/navbar/Navbar";
import Footer from "../common/footer/Footer";
const HomeLayout = () => {
  return (
    <div>
      <Hero hasoverlay={false} img={heroImg}>
        <Navbar />
        {<Outlet />}
        <Footer isHome={true} />
      </Hero>
    </div>
  );
};

export default HomeLayout;
