import React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Spinner from "../../components/common/Spinner";
import RealstateData from "../../components/reservationDetails/RealstateData";
import OwnerData from "../../components/reservationDetails/OwnerData";
import TenantData from "../../components/reservationDetails/TenantData";
import ReservationData from "../../components/reservationDetails/ReservationData";
import useReservationDetails from "../../hooks/useReservationDetails";
import { useMutation, useQueryClient } from "react-query";
import { request } from "../../services/axios";
import Swal from "sweetalert2";
import MainBtn from "../../components/common/buttons/MainBtn";
import { useNavigate } from "react-router-dom";
const CreateManualContract = () => {
  const params = useParams();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { isLoading, data } = useReservationDetails(params.id);
  const navigate = useNavigate();
  const handleNavigate = () =>
    navigate(`/website/manual-contract/details/${params.id}`);
  const handlePayment = async (data) => {
    return await request({
      url: `/app-fees`,
      method: "POST",
      data,
    });
  };

  const { isLoading: loadingPayment, mutate } = useMutation(handlePayment, {
    onSuccess: (data) => {
      if (data?.data?.status === 200) {
        window.open(data?.data?.data, "_blank");
        queryClient.invalidateQueries(["reservation-details", params.id]);
      } else {
        Swal.fire({
          icon: "error",
          title: data?.response?.data?.message,
        });
      }
    },
  });
  const handleClick = () => {
    const data = {
      booking_id: params.id,
    };
    mutate(data);
  };
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-8 mt-8">
          <div className="flex items-center justify-between mb-4">
            <p className="font-bold text-textColor text-md md:text-lg lg:text-xl xl:text-2xl ">
              {t("Create a contract (manually)")}
            </p>
            {data?.data?.data?.payed ? null : (
              <button
                onClick={handleClick}
                disabled={loadingPayment}
                className="flex items-center p-3 rounded-xl justify-center bg-[#ffa817] text-white  duration-300 min-w-[150px] hover:bg-white hover:text-[#ffa817] hover:border hover:border-[#ffa817]"
              >
                {t("payApp")}
              </button>
            )}
          </div>
          <div className="bg-white p-3 shadow-xl rounded-xl">
            <RealstateData data={data?.data?.data?.realestate} />
            <ReservationData data={data?.data?.data} />
            <OwnerData data={data?.data?.data?.realestate?.user} />
            <TenantData data={data?.data?.data?.tenant} />
            {data?.data?.data?.payed ? (
              <div className="w-full flex justify-center">
                <div className="min-w-[220px]">
                  <MainBtn text="print the contract" action={handleNavigate} />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default CreateManualContract;
