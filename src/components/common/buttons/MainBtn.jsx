import React from "react";
import { useTranslation } from "react-i18next";
const MainBtn = ({ type, action, text, disabled }) => {
  const { t } = useTranslation();
  return (
    <button
      disabled={disabled}
      onClick={action}
      type={type}
      className="w-full duration-300 bg-maincolorgreen text-white p-3 flex items-center justify-center rounded-lg uppercase disabled:bg-opacity-20"
    >
      {t(text)}
    </button>
  );
};

export default MainBtn;
