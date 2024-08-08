import React from "react";
import Lottie from "react-lottie";
import * as animationData from "../../assets/error.json";
import MainBtn from "../../components/common/buttons/MainBtn";
import Navbar from "../../templates/common/navbar/Navbar";
import Footer from "../../templates/common/footer/Footer";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Meta from "../../components/common/meta/Meta";
const ErrorPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const handleNavigate = () => navigate("/");
  return (
    <div>
      <Meta />
      <Navbar bg="bg-[#e7ebe7]" />
      <div className="main">
        <div className="container mx-auto px-8">
          <div className="w-full h-full flex items-center justify-center flex-col gap-3">
            <div className="w-full md:w-[350px] h-[350px]">
              <Lottie isClickToPauseDisabled options={defaultOptions} />
            </div>
            <p className="text-textColor font-semibold mb-2 text-base lg:text-lg">
              {t("not found")}
            </p>
            <div className="w-full md:w-[200px]">
              <MainBtn action={handleNavigate} text="back to home" />
            </div>
          </div>
        </div>
      </div>
      <Footer isHome={false} />
    </div>
  );
};

export default ErrorPage;
