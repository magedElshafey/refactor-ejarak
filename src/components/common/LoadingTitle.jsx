import React from "react";
import { useTranslation } from "react-i18next";
const LoadingTitle = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full h-full flex items-center justify-center text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
      <p>{t("loading")}...</p>
    </div>
  );
};

export default LoadingTitle;
