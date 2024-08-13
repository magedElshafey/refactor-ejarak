import React from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import DashboardNavbar from "./DashboardNavbar";
import Meta from "../../components/common/meta/Meta";
import Navbar from "../common/navbar/Navbar";
import { useTranslation } from "react-i18next";
const DashboardLayout = () => {
  const { t } = useTranslation();
  return (
    <>
      <Meta />
      <DashboardSidebar />
      <div className="mb-4 lg:ms-[280px]">
        <Navbar dashboard={true} bg="#f6f5f5" />
      </div>
      <div className={`lg:ms-[280px]`}>
        <Outlet />
      </div>
    </>
  );
};

export default DashboardLayout;
/**
 *  <div className=" flex">
        <DashboardSidebar />
        <div>
          <div className="mb-4">
            <Navbar dashboard={true} bg="#f6f5f5" />
          </div>
       
          <div>
            <Outlet />
          </div>
        </div>
      </div>
 */
