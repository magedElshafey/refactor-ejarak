import React from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { handlePayment } from "../../../services/post/handlePayment";
import Swal from "sweetalert2";
const PayBtn = ({ id, dep }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation(() => handlePayment(id), {
    onSuccess: (data) => {
      if (data?.data?.status) {
        window.open(data?.data?.data, "_blank");
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
    const data = "";
    mutate(data);
  };
  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="flex items-center p-3 rounded-xl justify-center bg-[#ffa817] text-white  duration-300 min-w-[150px] hover:bg-white hover:text-[#ffa817] hover:border hover:border-[#ffa817]"
    >
      {t("pay")}
    </button>
  );
};

export default PayBtn;
