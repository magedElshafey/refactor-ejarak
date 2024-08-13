import React from "react";
import { MdErrorOutline } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
const PaymentError = () => {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto px-8 md:px-16">
      <div className="w-full h-full flex flex-col items-center justify-center gap-4 mt-24 ">
        <div className=" bg-red-600 flex items-center justify-center w-16 h-16 rounded-[50%] text-white">
          <MdErrorOutline size={30} />
        </div>
        <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-red-600">
          {t("issuee")}
        </p>
        <p className=" font-medium text-md md:text-lg lg:text-xl xl:text-2xl">
          {t("try again")}
        </p>
        <p className=" text-slate-500">{t("payment desc")}</p>
        <Link
          to="/"
          className="flex items-center justify-center p-3 rounded-2xl text-white font-bold bg-maincolorgreen w-[180px]"
        >
          {t("home")}
        </Link>
      </div>
    </div>
  );
};

export default PaymentError;
