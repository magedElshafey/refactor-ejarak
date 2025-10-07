import React from "react";
import { useTranslation } from "react-i18next";
import { handleAcceptReservation } from "../../../services/post/handleAcceptReservation";
import { useMutation, useQueryClient } from "react-query";
import { getCurrentDate } from "../../../utils/getCurrentDate";
import Swal from "sweetalert2";
const AcceptReservationBtn = ({ id, data, dep }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation(
    () =>
      handleAcceptReservation(id, {
        status: "completed",
        accepted_at: getCurrentDate(),
      }),
    {
      onSuccess: (data) => {
        if (data?.data?.status) {
          Swal.fire({
            icon: "success",
            title: data?.data?.message,
          });
          queryClient.invalidateQueries([dep]);
        } else {
          Swal.fire({
            icon: "error",
            title: data?.response?.data?.message,
          });
        }
      },
    }
  );
  const handleClick = async () => {
    Swal.fire({
      text: t("acceptReq"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("accept"),
      cancelButtonText: t("cancel"),
    }).then(async (result) => {
      if (result.isConfirmed) {
        const reservationData = {
          status: "completed",
          accepted_at: data,
        };
        mutate(reservationData);
      } else {
        return;
      }
    });
  };
  return (
    <button
      onClick={handleClick}
      disabled={isLoading || !data?.payed}
      className="flex items-center p-2 md:p-3 rounded-xl justify-center bg-white text-maincolorgreen border border-maincolorgreen duration-300 w-auto md:w-[150px] hover:bg-maincolorgreen hover:text-white hover:border-white disabled:cursor-not-allowed disabled:bg-opacity-45"
    >
      {t("accept")}
    </button>
  );
};

export default AcceptReservationBtn;
