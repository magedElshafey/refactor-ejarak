import React from "react";
import Hero from "../../components/common/Hero";
import img from "../../assets/newBac.png";
import AuthCard from "../../components/common/auth/AuthCard";
import { Outlet } from "react-router-dom";
import Meta from "../../components/common/meta/Meta";
const AuthLayout = () => {
  return (
    <div>
      <Meta />
      <Hero hasoverlay={true} img={img}>
        <div className="w-full container mx-auto px-8">
          <AuthCard>
            <Outlet />
          </AuthCard>
        </div>
      </Hero>
    </div>
  );
};

export default AuthLayout;
