import React from "react";
import { useTranslation } from "react-i18next";
const MainBtn = ({ type, action, text }) => {
  const { t } = useTranslation();
  return (
    <button
      onClick={action}
      type={type}
      className="w-full bg-maincolorgreen text-white p-3 flex items-center justify-center rounded-lg"
    >
      {t(text)}
    </button>
  );
};

export default MainBtn;
