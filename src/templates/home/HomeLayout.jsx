import React from "react";
import { Outlet } from "react-router-dom";
import heroImg from "../../assets/riad.png";
import Hero from "../../components/common/Hero";
import Navbar from "../common/navbar/Navbar";
import Footer from "../common/footer/Footer";
import Meta from "../../components/common/meta/Meta";
import FixedBtn from "../../components/common/buttons/FixedBtn";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/auth";
import { getMyAccountDetails } from "../../services/get/getMyAccountDetails";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useNafath } from "../../hooks/useNafath";
import NafathModal from "../../components/common/naftahmodal/NafathModal";
const HomeLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { userData, token } = useSelector((state) => state.authSlice);
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
  const {
    showModal,
    randomNum,
    nafazStatus,
    loadingNafazStatus,
    loadingNafaz,
    handleStart,
    handleStatusCheck,
    setRandomNum,
    setNafazStatus,
    role,
    error,
    errorMessage,
  } = useNafath();

  return (
    <>
      {userData ? (
        userData?.confirmed_with_nafath || nafazStatus === "COMPLETED" ? (
          <>
            <Meta />
            <FixedBtn />
            <Hero hasoverlay={false} img={heroImg}>
              <Navbar />
              {<Outlet />}
              <Footer isHome={true} />
            </Hero>
          </>
        ) : (
          <NafathModal
            showModal={showModal}
            randomNum={randomNum}
            nafazStatus={nafazStatus}
            loadingNafaz={loadingNafaz}
            loadingNafazStatus={loadingNafazStatus}
            onCheckStatus={handleStatusCheck}
            onRetry={() => {
              setRandomNum("");
              handleStart();
              setNafazStatus("");
            }}
            role={role}
            error={error}
            errorMessage={errorMessage}
          />
        )
      ) : (
        <>
          <Meta />
          <FixedBtn />
          <Hero hasoverlay={false} img={heroImg}>
            <Navbar />
            {<Outlet />}
            <Footer isHome={true} />
          </Hero>
        </>
      )}
    </>
  );
};

export default HomeLayout;
/**
 *   <>
      {nafazStatus === "COMPLETED" ? (
        <>
          <Meta />
          <FixedBtn />
          <Hero hasoverlay={false} img={heroImg}>
            <Navbar />
            {<Outlet />}
            <Footer isHome={true} />
          </Hero>
        </>
      ) : (
       
      )}
    </>
 */
