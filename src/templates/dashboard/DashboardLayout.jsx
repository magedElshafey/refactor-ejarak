import React from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import DashboardNavbar from "./DashboardNavbar";
import Meta from "../../components/common/meta/Meta";
const DashboardLayout = () => {
  return (
    <>
      <Meta />
      <div className="w-full flex">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col gap-2">
          <DashboardNavbar />
          <div className="px-5 md:px-8">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
