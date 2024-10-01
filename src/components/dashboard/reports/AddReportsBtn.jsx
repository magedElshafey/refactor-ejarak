import React from "react";
import { useTranslation } from "react-i18next";
const AddReportsBtn = ({ setShowReportForm }) => {
  const { t } = useTranslation();
  return (
    <button
      onClick={() => setShowReportForm(true)}
      className="flex items-center justify-center p-3 rounded-md bg-yellow font-semibold w-[140px]"
    >
      {t("addd")}
    </button>
  );
};

export default AddReportsBtn;
