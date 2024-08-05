import React from "react";
import img from "../../assets/noInt.jpg";
import { useTranslation } from "react-i18next";
import { CiWifiOff } from "react-icons/ci";

const OfflineNerwork = () => {
  const { t } = useTranslation();
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-3">
      <img src={img} alt="no-interner" className="h-[300px] object-cover" />
      <div className="flex items-center text-red-600 gap-2 font-bold text-md md:text-lg lg:text-xl xl:text-2xl">
        <p>{t("sorry")}</p>
        <CiWifiOff size={30} className="font-bold" />
      </div>
      <p className="font-bold text-maincolorgreen">
        {t("no internet connection")}
      </p>
    </div>
  );
};

export default OfflineNerwork;
