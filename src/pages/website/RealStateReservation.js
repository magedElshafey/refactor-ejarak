import React, { useState } from "react";
import { useQuery } from "react-query";
import Spinner from "../../components/common/Spinner";
import RealstateCard from "../../components/common/RealstateCard";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { getRealStateDetails } from "../../services/get/getRealStateDetails";
import { getRealstateBookings } from "../../services/get/getRealstateBookings";
import { filterdReservations } from "../../data/data";
import StatusNavbar from "../../components/common/status/StatusNavbar";
import useFilteredData from "../../hooks/useFilteredData";
import { useSelector } from "react-redux";
import ReservationCard from "../../components/common/reservations/ReservationCard";
import NoDataTitle from "../../components/common/NoDataTitle";
import { getCurrentDate } from "../../utils/getCurrentDate";
import RefusedReason from "../../components/common/RefusedReason";
const RealStateReservation = () => {
  const { t } = useTranslation();
  const params = useParams();
  const { isLoading: loadingDetails, data } = useQuery(
    ["realstate-details", params.id],
    () => getRealStateDetails(params.id),
    {
      onSuccess: (data) => console.log("real state data", data?.data?.data),
    }
  );
  const { isLoading: loadingBookings, data: bookings } = useQuery(
    ["realstate-booking", params.id],
    () => getRealstateBookings(params.id)
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const created_at = getCurrentDate();
  const { userData } = useSelector((state) => state.authSlice);
  const role = userData?.account?.type;
  const filteredData = useFilteredData(
    bookings?.data?.data || [],
    filterdReservations,
    activeIndex
  );
  return (
    <>
      {loadingDetails || loadingBookings ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-8 mt-8">
          <p className="mb-6 text-lg md:text-xl lg:text-3xl font-bold text-textColor">
            {t("reservationHousesss")}
          </p>
          <RealstateCard data={data?.data?.data} />
          <div className="bg-white p-6 rounded-2xl shadow-2xl mt-5">
            <StatusNavbar
              statusFilter={filterdReservations}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
            {filteredData?.length ? (
              filteredData?.map((item, index) => (
                <div key={index}>
                  <ReservationCard
                    created_at={created_at}
                    data={item}
                    index={index}
                    role={role}
                    dep="my-reservations"
                    isContract={false}
                  />
                  {item.status === "refused" ? (
                    <RefusedReason reason={item?.rent_refused_reasons_id} />
                  ) : null}
                </div>
              ))
            ) : (
              <NoDataTitle />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default RealStateReservation;
