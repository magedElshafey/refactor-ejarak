import React from "react";
import MainBtn from "../common/buttons/MainBtn";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { createManualContract } from "../../services/post/createManualContract";
import LoadingBtn from "../common/buttons/LoadingBtn";
import Swal from "sweetalert2";
const ManualContractBtn = ({ id }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleNavigate = () => navigate(-1);
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation(createManualContract, {
    onSuccess: (data) => {
      console.log("data from create contract", data);
      if (data?.data?.status) {
        queryClient.invalidateQueries("my-reservations");
        queryClient.invalidateQueries("my-contracts");

        Swal.fire({
          text: data?.data?.message,
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: t("print-contract"),
          cancelButtonText: t("cancel"),
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(`/website/manual-contract/details/${id}`);
          } else {
            return;
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: data?.response?.data?.message,
        });
      }
    },
  });
  const handleClick = () => {
    const contractData = {
      booking_id: id,
      type: "manual",
    };
    mutate(contractData);
  };
  return (
    <div className="my-3 w-full flex items-center justify-between lg:justify-center gap-8 flex-wrap">
      <div className="min-w-[240px]">
        {isLoading ? (
          <LoadingBtn />
        ) : (
          <MainBtn action={handleClick} text={t("create contract")} />
        )}
      </div>
      <button
        onClick={handleNavigate}
        className=" font-medium text-base md:text-md lg:text-lg xl:text-xl text-textColor"
      >
        {t("back")}
      </button>
    </div>
  );
};

export default ManualContractBtn;
