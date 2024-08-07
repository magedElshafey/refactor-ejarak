import React, { useState } from "react";
import AccountDetailsNavbar from "../../components/common/accountDetails/AccountDetailsNavbar";
import { statusFilter } from "../../data/data";
import StatusNavbar from "../../components/common/status/StatusNavbar";
import useFilteredData from "../../hooks/useFilteredData";
import { useQuery } from "react-query";
import { getMyRealState } from "../../services/get/getMyRealState";
import Spinner from "../../components/common/Spinner";
import RealstateCard from "../../components/common/RealstateCard";
import MainBtn from "../../components/common/buttons/MainBtn";
import { useNavigate } from "react-router-dom";
import UpdateBtn from "../../components/common/realstates/UpdateBtn";
import { getCurrentDate } from "../../utils/getCurrentDate";
import ReservationBtn from "../../components/common/realstates/ReservationBtn";
import EditBtn from "../../components/common/realstates/EditBtn";
import DeleteBtn from "../../components/common/realstates/DeleteBtn";
import NoDataTitle from "../../components/common/NoDataTitle";
import RefusedReason from "../../components/common/RefusedReason";
const MyRealStates = () => {
  const created_at = getCurrentDate();
  const [activeIndex, setActiveIndex] = useState(0);
  const { isLoading, data } = useQuery("my-realstates", getMyRealState);
  const navigate = useNavigate();
  const filteredData = useFilteredData(
    data?.data?.data || [],
    statusFilter,
    activeIndex
  );
  const handleAddRealState = () => navigate("/website/add-realstate");

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-8 mt-8">
          <AccountDetailsNavbar />
          <div className="bg-white p-6 rounded-2xl shadow-2xl mt-5">
            <div className="w-full flex items-center justify-between gap-8 mb-8 flex-wrap">
              <StatusNavbar
                statusFilter={statusFilter}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />

              <div className="w-[200px]">
                <MainBtn text="add realstate" action={handleAddRealState} />
              </div>
            </div>
            {filteredData.length ? (
              filteredData.map((item, index) => (
                <div key={index}>
                  <RealstateCard data={item} />
                  <div className="w-full flex items-center justify-between flex-col md:flex-row gap-5">
                    {item.status === "refused" ? (
                      <div className="flex-1">
                        <RefusedReason reason={item.reason_refuse} />
                      </div>
                    ) : null}

                    <div className="my-4 flex gap-3 justify-end overflow-x-auto">
                      {item.status === "accepted" ? (
                        <UpdateBtn
                          data={created_at}
                          id={item.id}
                          dep="my-realstates"
                        />
                      ) : null}
                      {item.status === "accepted" ? (
                        <ReservationBtn id={item.id} />
                      ) : null}
                      <EditBtn id={item.id} />
                      <DeleteBtn id={item.id} dep="my-realstates" />
                    </div>
                  </div>
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

export default MyRealStates;
