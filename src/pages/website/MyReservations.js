import React, { useState } from "react";
import { filterdReservations } from "../../data/data";
import StatusNavbar from "../../components/common/status/StatusNavbar";
import useFilteredData from "../../hooks/useFilteredData";
import Spinner from "../../components/common/Spinner";
import { useQuery } from "react-query";
import { getMyReservations } from "../../services/get/getMyReservations";
import { useSelector } from "react-redux";
import ReservationCard from "../../components/common/reservations/ReservationCard";
import NoDataTitle from "../../components/common/NoDataTitle";
import { getCurrentDate } from "../../utils/getCurrentDate";
import RefusedReason from "../../components/common/RefusedReason";
import MyOrderDetailsNavbar from "../../components/common/accountDetails/MyOrderDetailsNavbar";
const MyReservations = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const created_at = getCurrentDate();
  const { userData } = useSelector((state) => state.authSlice);
  const role = userData?.account?.type;
  const { isLoading, data } = useQuery("my-reservations", () =>
    getMyReservations(role)
  );
  const filteredData = useFilteredData(
    data?.data?.data || [],
    filterdReservations,
    activeIndex
  );
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-8 mt-8">
          <MyOrderDetailsNavbar />
          <div className="bg-white p-6 rounded-2xl shadow-2xl mt-5">
            <div className="mb-5">
              <StatusNavbar
                statusFilter={filterdReservations}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            </div>
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
                    <RefusedReason
                      reason={
                        item?.other_reasons
                          ? item?.other_reasons
                          : item?.rent_refused_reasons_id
                      }
                    />
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

export default MyReservations;
