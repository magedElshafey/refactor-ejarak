import React from "react";
import { useTranslation } from "react-i18next";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteRealstate } from "../../../services/post/deleteRealstate";
import { useMutation, useQueryClient } from "react-query";
import Swal from "sweetalert2";
const DeleteBtn = ({ id, dep }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation(() => deleteRealstate(id), {
    onSuccess: (data) => {
      console.log("data from delete", data);
      if (data?.data?.status) {
        Swal.fire({
          icon: "success",
          title: data?.data?.message,
        });
        queryClient.invalidateQueries(dep);
      } else {
        Swal.fire({
          icon: "error",
          title: data?.response?.data?.message,
        });
      }
    },
  });
  const handleClick = () => {
    mutate();
  };
  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="w-28 flex justify-around gap-x-3 items-center cursor-pointer border-2 p-2 rounded-lg transition-all text-[#FF4158] border-[#FF4158] hover:bg-[#FF4158] hover:text-white hover:border-white"
    >
      <p>{t("dele")}</p>
      <RiDeleteBin6Line size={20} />
    </button>
  );
};

export default DeleteBtn;
