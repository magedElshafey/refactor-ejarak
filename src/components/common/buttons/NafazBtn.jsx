import React from "react";
import { useTranslation } from "react-i18next";
const NafazBtn = () => {
  const { t } = useTranslation();
  return (
    <button className="w-full bg-white text-maincolorgreen border border-main4 p-3 flex items-center justify-center rounded-lg">
      {t("national")}
    </button>
  );
};

export default NafazBtn;
