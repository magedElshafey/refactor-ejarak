import React from "react";
import { useTranslation } from "react-i18next";
import { IoMdWarning } from "react-icons/io";
const ReportRealstateBtn = ({ toggleShowReportForm }) => {
  const { t } = useTranslation();
  return (
    <button
      onClick={toggleShowReportForm}
      className="flex items-center justify-center gap-2  text-white bg-[#ff4158] p-3 rounded-lg w-[160px] md:w-[200px]"
    >
      <p>{t("issue")}</p>
      <IoMdWarning size={20} />
    </button>
  );
};

export default ReportRealstateBtn;
