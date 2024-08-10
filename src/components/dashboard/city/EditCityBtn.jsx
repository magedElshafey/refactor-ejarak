import React from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
const EditCityBtn = ({ id, setShowEditCityForm }) => {
  const { t } = useTranslation();
  const handleClick = () => {
    if (!id) {
      Swal.fire({
        icon: "error",
        title: t("you need to choose the city you want to edit"),
      });
      return;
    } else {
      Swal.fire({
        text: t("do you sure you want to edit the city"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: t("edit"),
        cancelButtonText: t("cancel"),
      }).then((res) => {
        if (res.isConfirmed) {
          setShowEditCityForm(true);
        } else {
          return;
        }
      });
    }
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

export default EditCityBtn;
