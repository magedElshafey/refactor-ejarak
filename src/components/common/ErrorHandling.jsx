import React from "react";
import Lottie from "react-lottie";
import * as animationData from "../../assets/no.json";
import MainBtn from "../../components/common/buttons/MainBtn";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
const ErrorHandling = () => {
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
  return <div>ErrorHandling</div>;
};

export default ErrorHandling;
