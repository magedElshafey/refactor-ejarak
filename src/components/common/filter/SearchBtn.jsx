import React from "react";
import { closeFilter } from "../../../store/filterSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
const SearchBtn = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(closeFilter());
  };
  return (
    <button
      onClick={handleClick}
      className="bg-maincolorgreen p-3 flex items-center text-white justify-center rounded-md"
    >
      {t("search")}
    </button>
  );
};

export default SearchBtn;
