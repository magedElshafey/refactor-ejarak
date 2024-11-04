import React from "react";
import Navbar from "../common/navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../common/footer/Footer";
import Meta from "../../components/common/meta/Meta";
import FixedBtn from "../../components/common/buttons/FixedBtn";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { logout } from "../../store/auth";
import { getMyAccountDetails } from "../../services/get/getMyAccountDetails";
const WebsiteLayout = () => {
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
    <div>
      <Meta />
      <FixedBtn />
      <Navbar bg="bg-[#e7ebe7]" />
      {
        <div className="main">
          <Outlet />
        </div>
      }
      <Footer isHome={false} />
    </div>
  );
};

export default WebsiteLayout;
