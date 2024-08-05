import React from "react";
import Sidebar from "./Sidebar";

const DashboardSidebar = () => {
  return (
    <div>
      <div className="hidden lg:block ">
        <Sidebar />
      </div>
    </div>
  );
};

export default DashboardSidebar;
