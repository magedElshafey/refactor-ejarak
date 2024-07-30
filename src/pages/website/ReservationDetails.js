import React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Spinner from "../../components/common/Spinner";
import { getReservationDetails } from "../../services/get/getReservationDetails";
import { useQuery } from "react-query";
import RealstateData from "../../components/reservationDetails/RealstateData";
const ReservationDetails = () => {
  const params = useParams();
  const { t } = useTranslation();
  const { isLoading, data } = useQuery(["reservation-details", params.id], () =>
    getReservationDetails(params.id)
  );
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
        </div>
      )}
    </>
  );
};

export default ReservationDetails;
