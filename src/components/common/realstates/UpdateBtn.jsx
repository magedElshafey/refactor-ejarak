import React from "react";
import { useTranslation } from "react-i18next";
import { TfiReload } from "react-icons/tfi";
import { updateRealState } from "../../../services/post/updateRealstate";
import { useMutation, useQueryClient } from "react-query";
import Swal from "sweetalert2";
const UpdateBtn = ({ data, id, dep }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation(() => updateRealState(id, data), {
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
    mutate(data);
  };
  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="w-28 flex justify-around gap-x-3 items-center cursor-pointer border-2 p-2 rounded-lg transition-all text-[#039BB8] border-[#039BB8] hover:bg-[#039BB8] hover:text-white hover:border-white"
    >
      <p>{t("update")}</p>
      <TfiReload size={20} />
    </button>
  );
};

export default UpdateBtn;
