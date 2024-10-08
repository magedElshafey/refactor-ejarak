import React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Spinner from "../../components/common/Spinner";
import RealstateData from "../../components/reservationDetails/RealstateData";
import OwnerData from "../../components/reservationDetails/OwnerData";
import TenantData from "../../components/reservationDetails/TenantData";
import ReservationData from "../../components/reservationDetails/ReservationData";
import useReservationDetails from "../../hooks/useReservationDetails";
const ReservationDetails = () => {
  const params = useParams();
  const { t } = useTranslation();
  const { isLoading, data } = useReservationDetails(params.id);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-8 mt-8">
          <p className="text-lg md:text-xl lg:text-2xl font-bold text-textColor mb-8">
            {t("reservationDetails")}
          </p>
          <RealstateData data={data?.data?.data?.realestate} />
          <ReservationData data={data?.data?.data} />
          <OwnerData data={data?.data?.data?.realestate?.user} />
          <TenantData data={data?.data?.data?.tenant} />
        </div>
      )}
    </>
  );
};

export default ReservationDetails;
