import React from "react";
import { useTranslation } from "react-i18next";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteRealstate } from "../../../services/post/deleteRealstate";
import { useMutation, useQueryClient } from "react-query";
import Swal from "sweetalert2";
const DeleteBtn = ({ id, dep }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation((v) => deleteRealstate(id, v), {
    onSuccess: (data) => {
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
    Swal.fire({
      title: t("Are you sure you want to delete the realstate"),
      text: t("You won't be able to revert this!"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#009639",
      cancelButtonColor: "#ED2E38",
      confirmButtonText: t("Yes, delete it!"),
      cancelButtonText: t("cancel"),
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: t("Please , Enter the deleted reason"),
          input: "text",
          inputValidator: (value) => {
            if (!value) {
              return t("You need to Enter the deleted reason");
            }
          },
          showCancelButton: true,
          confirmButtonColor: "#009639",
          confirmButtonText: t("send"),
          cancelButtonColor: "#ED2E38",
          cancelButtonText: t("cancel"),
        }).then((res) => {
          if (res.isConfirmed) {
            const delete_reason = res.value;
            console.log("delete reaseon", delete_reason);
            const data = { delete_reason };
            mutate(data);
          } else {
            return;
          }
        });
      } else {
        return;
      }
    });
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
