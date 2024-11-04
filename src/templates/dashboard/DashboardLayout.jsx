import React from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import Meta from "../../components/common/meta/Meta";
import DashboardNavbar from "./DashboardNavbar";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { logout } from "../../store/auth";
import { getMyAccountDetails } from "../../services/get/getMyAccountDetails";
const DashboardLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { token } = useSelector((state) => state.authSlice);
  const { isLoading, data: profileData } = useQuery(
    "account-details",
    getMyAccountDetails,
    {
      enabled: token !== null,
      onSuccess: (data) => {
        if (data?.data?.status) {
          return;
        } else if (data?.response?.status === 401) {
          Swal.fire({
            icon: "error",
            title: t("expired session"),
            text: t("need to login again"),
          }).then((res) => {
            if (res?.isConfirmed) {
              dispatch(logout());
              window.location.reload();
              navigate("/auth/login");
            }
          });
        }
      },
    }
  );
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
