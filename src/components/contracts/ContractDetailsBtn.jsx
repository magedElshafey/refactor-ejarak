import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const ContractDetailsBtn = ({ id }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleClick = () => navigate(`/website/manual-contract-details/${id}`);
  return (
    <button
      onClick={handleClick}
      className="flex items-center p-3 rounded-xl justify-center bg-white text-maincolorgreen border border-maincolorgreen duration-300 min-w-[150px] hover:bg-maincolorgreen hover:text-white hover:border-white"
    >
      {t("viewDetails")}
    </button>
  );
};

export default ContractDetailsBtn;
