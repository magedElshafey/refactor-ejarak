import React from "react";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
const ErrorHandling = () => {
  const { t } = useTranslation();
  const fireAlert = () => {
    Swal.fire({
      icon: "error",
      title: t("error50"),
      confirmButtonText: t("s"),
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
  };
  return fireAlert();
};

export default ErrorHandling;
