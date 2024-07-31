import React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Spinner from "../../components/common/Spinner";
import RealstateData from "../../components/reservationDetails/RealstateData";
import OwnerData from "../../components/reservationDetails/OwnerData";
import TenantData from "../../components/reservationDetails/TenantData";
import ReservationData from "../../components/reservationDetails/ReservationData";
import useReservationDetails from "../../hooks/useReservationDetails";
import ManualContractBtn from "../../components/createmanualContract/ManualContractBtn";
const CreateManualContract = () => {
  const params = useParams();
  const { t } = useTranslation();
  const { isLoading, data } = useReservationDetails(params.id);
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-8 mt-8">
          <p className="font-bold text-textColor text-md md:text-lg lg:text-xl xl:text-2xl mb-4">
            {t("Create a contract (manually)")}
          </p>
          <div className="bg-white p-3 shadow-xl rounded-xl">
            <RealstateData data={data?.data?.data?.realestate} />
            <ReservationData data={data?.data?.data} />
            <OwnerData data={data?.data?.data?.realestate?.user} />
            <TenantData data={data?.data?.data?.tenant} />
            <ManualContractBtn id={params.id} />
          </div>
        </div>
      )}
    </>
  );
};

export default CreateManualContract;
