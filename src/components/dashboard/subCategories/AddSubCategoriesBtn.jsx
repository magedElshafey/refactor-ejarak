import React from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
const AddSubCategoriesBtn = ({ setShowAddSubCategoryForm, categoryId }) => {
  const { t } = useTranslation();
  const handleClick = () => {
    if (categoryId) {
      setShowAddSubCategoryForm(true);
    } else {
      Swal.fire({
        icon: "error",
        title: t("choose the category first"),
      });
      return;
    }
  };
  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center p-3 rounded-md bg-yellow font-semibold w-[140px]"
    >
      {t("addd")}
    </button>
  );
};

export default AddSubCategoriesBtn;
