import React from "react";
import logo from "../../assets/ejark white.png";
const Spinner = () => {
  return (
    <div className=" w-screen h-screen fixed top-0 left-0 z-[3500] bg-slate-900 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <img alt="logo" src={logo} className="w-[90px]" />
        <div className="dots"></div>
      </div>
    </div>
  );
};

export default Spinner;
