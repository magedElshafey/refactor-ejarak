import React from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import LoadingBtn from "../common/buttons/LoadingBtn";
import { activatePackage } from "../../services/post/activatePackage";
import { createElectronicContract } from "../../services/post/createElectronicContract";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
const PackageCard = ({
  data,
  isActive,
  showActivateBtn,
  remainingContracts,
}) => {
  const { t } = useTranslation();
  const params = useParams();
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation(() => activatePackage(data.id), {
    onSuccess: (data) => {
      if (data?.data?.status) {
        Swal.fire({
          icon: "success",
          title: data?.data?.message,
        });
        window.open(data?.data?.data, "_blank");
        queryClient.invalidateQueries("packages");
        queryClient.invalidateQueries("my-reservations");
        queryClient.invalidateQueries("my-contracts");
      } else {
        Swal.fire({
          icon: "error",
          title: data?.response?.data?.message,
        });
      }
    },
  });
  const handleActivatePackage = () => {
    const packageData = {
      booking_id: +params.id,
      type: "electronic_agent",
      package_id: data.id,
    };
    mutate(packageData);
  };
  const { isLoading: loadingCreateContract, mutate: mutateCreateContract } =
    useMutation(createElectronicContract, {
      onSuccess: (data) => {
        if (data?.data?.status) {
          Swal.fire({
            icon: "success",
            title: data?.data?.message,
          });
          queryClient.invalidateQueries("packages");
          queryClient.invalidateQueries("my-reservations");
          queryClient.invalidateQueries("my-contracts");
        } else {
          Swal.fire({
            icon: "error",
            title: data?.response?.data?.message,
          });
        }
      },
    });
  const handleCreateContract = () => {
    const contractData = {
      booking_id: +params.id,
      type: "electronic_agent",
      package_id: data.id,
    };
    mutateCreateContract(contractData);
  };
  return (
    <div
      className={`border-2 rounded-lg p-3 ${
        (!isActive && showActivateBtn) || isActive ? null : "h-[350px]"
      }  ${isActive ? "border-maincolorgreen" : "border-slate-500"}`}
    >
      <div className="bg-slate-100 rounded-xl w-full p-4 mb-8">
        <p className="text-center font-bold mb-4">{data?.name}</p>
        <div className="w-full flex items-center justify-between ">
          <p className="bg-maincolorgreen text-white rounded-lg p-2">
            {t("contractCount")} : {data?.no_contracts}
          </p>
          {isActive ? (
            <p className="bg-white text-maincolorgreen rounded-lg p-2">
              {t("remainingContracts")} : {remainingContracts}
            </p>
          ) : null}
        </div>
      </div>
      <p className="text-[#4D5F65] font-semibold mb-6">{data?.notes}</p>
      <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-textColor text-center mb-8">
        {data?.price} {t("currency")}
      </p>
      <div>
        {!isActive && showActivateBtn ? (
          <>
            {isLoading ? (
              <div className="max-w-[180px]">
                <LoadingBtn />
              </div>
            ) : (
              <button
                onClick={handleActivatePackage}
                className=" bg-maincolorgreen flex items-center justify-center text-white  p-3 rounded-lg"
              >
                {t("Activate the package")}
              </button>
            )}
          </>
        ) : isActive ? (
          <>
            {loadingCreateContract ? (
              <div className="max-w-[180px]">
                <LoadingBtn />
              </div>
            ) : (
              <button
                onClick={handleCreateContract}
                className=" bg-maincolorgreen flex items-center justify-center text-white  p-3 rounded-lg"
              >
                {t("create contract")}
              </button>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default PackageCard;
