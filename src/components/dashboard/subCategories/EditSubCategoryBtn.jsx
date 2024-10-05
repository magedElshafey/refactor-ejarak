import React from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
const EditSubCategoryBtn = ({
  categoryId,
  subCategoryId,
  setShowEditSubCategoryForm,
}) => {
  const { t } = useTranslation();
  const handleClick = () => {
    // التحقق من إدخال الفئة والفئة الفرعية
    if (!categoryId) {
      Swal.fire({
        icon: "error",
        title: t("you need to choose the category first for editing"),
      });
      return;
    }

    if (!subCategoryId) {
      Swal.fire({
        icon: "error",
        title: t("you need to choose the sub category first for editing"),
      });
      return;
    }

    // التأكيد على عملية الحذف
    Swal.fire({
      text: t("do you sure you want to edit the sub category"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("edit"),
      cancelButtonText: t("cancel"),
    }).then((res) => {
      if (res.isConfirmed) {
        setShowEditSubCategoryForm(true);
      }
    });
  };
  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center p-3 rounded-md bg-mint font-semibold w-[140px]"
    >
      {t("edit")}
    </button>
  );
};

export default EditSubCategoryBtn;
