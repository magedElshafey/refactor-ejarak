import React from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import Meta from "../../components/common/meta/Meta";
import DashboardNavbar from "./DashboardNavbar";
const DashboardLayout = () => {
  return (
    <>
      <Meta />
      <DashboardSidebar />
      <div className="lg:ms-[280px]">
        <DashboardNavbar />
        {/* <Navbar dashboard={true} bg="bg-[#f9f9f9]" /> */}
      </div>
      <div className="dashboardMain lg:ms-[280px] py-4">
        <Outlet />
      </div>
    </>
  );
};

export default DashboardLayout;
