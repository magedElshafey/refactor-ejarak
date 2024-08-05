import React from "react";

const RealstateInfo = ({ name }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 justify-between">
        <p className=" font-extrabold text-textColor text-lg md:text-xl lg:text-2xl ">
          {name}
        </p>
      </div>
    </div>
  );
};

export default RealstateInfo;
