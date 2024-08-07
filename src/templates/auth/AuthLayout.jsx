import React from "react";
import Hero from "../../components/common/Hero";
import img from "../../assets/newBac.png";
import AuthCard from "../../components/common/auth/AuthCard";
import { Outlet } from "react-router-dom";
const AuthLayout = () => {
  return (
    <div>
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
