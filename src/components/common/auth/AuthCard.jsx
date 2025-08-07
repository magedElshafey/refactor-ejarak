import React from "react";
import logo from "../../../assets//ejark green.png";
import Logo from "../../common/Logo";
const AuthCard = ({ children }) => {
  return (
    <div className="bg-white w-full md:w-[450px] lg:w-[600px] py-4 px-6 rounded-lg shadow-xl h-auto max-h-[650px] overflow-y-auto ">
      <div className="w-full flex justify-center mb-3">
        <Logo img={logo} />
      </div>
      {children}
    </div>
  );
};

export default AuthCard;
