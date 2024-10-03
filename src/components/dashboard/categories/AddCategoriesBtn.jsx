import React from "react";
import { useTranslation } from "react-i18next";
const AddCategoriesBtn = ({ setShowCategoryForm }) => {
  const { t } = useTranslation();
  return (
    <button
      onClick={() => setShowCategoryForm(true)}
      className="flex items-center justify-center p-3 rounded-md bg-yellow font-semibold w-[140px]"
    >
      {t("addd")}
    </button>
  );
};

export default AddCategoriesBtn;
