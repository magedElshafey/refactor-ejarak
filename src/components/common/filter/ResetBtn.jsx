import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { resetFilter } from "../../../store/filterSlice";

const ResetBtn = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(resetFilter());
  };
  return (
    <button
      onClick={handleClick}
      className="bg-maincolorgreen p-3 flex items-center text-white justify-center rounded-md"
    >
      {t("reset")}
    </button>
  );
};

export default ResetBtn;
