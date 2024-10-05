import React from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "react-query";
import { deleteCateogry } from "../../../services/delete/dashboard/deleteCategory";
const DelteCategoryBtn = ({ id, setCategoryId }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation((v) => deleteCateogry(id, v), {
    onSuccess: (data) => {
      if (data?.data?.status) {
        Swal.fire({
          icon: "success",
          title: data?.data?.message,
        });
        queryClient.invalidateQueries("categories");
        queryClient.invalidateQueries("featuers");
        setCategoryId("");
      } else {
        Swal.fire({
          icon: "error",
          title: data?.response?.data?.message,
        });
      }
    },
  });
  const handleDelete = () => {
    if (!id) {
      Swal.fire({
        icon: "error",
        title: t("you need to choose the category you want to remove"),
      });
      return;
    } else {
      Swal.fire({
        text: t("do you sure you want to remove the category"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: t("del"),
        cancelButtonText: t("cancel"),
      }).then((res) => {
        if (res.isConfirmed) {
          const cityData = {};
          mutate(cityData);
        } else {
          return;
        }
      });
    }
  };
  return (
    <button
      disabled={isLoading}
      onClick={handleDelete}
      className="flex items-center justify-center p-3 rounded-md bg-pink font-semibold w-[140px]"
    >
      {t("del")}
    </button>
  );
};

export default DelteCategoryBtn;
