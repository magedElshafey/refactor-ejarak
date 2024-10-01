import React from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
const EditReportBtn = ({ id, setShowEditReportForm }) => {
  const { t } = useTranslation();
  const handleClick = () => {
    if (!id) {
      Swal.fire({
        icon: "error",
        title: t("you need to choose the reason you want to edit"),
      });
      return;
    } else {
      Swal.fire({
        text: t("do you sure you want to edit the reason"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: t("edit"),
        cancelButtonText: t("cancel"),
      }).then((res) => {
        if (res.isConfirmed) {
          setShowEditReportForm(true);
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

export default EditReportBtn;
