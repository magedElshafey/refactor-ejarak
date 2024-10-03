import React from "react";
import { useTranslation } from "react-i18next";
const AddPaymentBtn = ({ setShowPaymentForm }) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={() => setShowPaymentForm(true)}
      className="flex items-center justify-center p-3 rounded-md bg-yellow font-semibold w-[140px]"
    >
      {t("addd")}
    </button>
  );
};

export default AddPaymentBtn;
