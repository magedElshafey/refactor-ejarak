import React from "react";
import { useTranslation } from "react-i18next";

const NoDataTitle = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full h-full flex items-center justify-center text-lg font-medium">
      <p>{t("no data")}</p>
    </div>
  );
};

export default NoDataTitle;
