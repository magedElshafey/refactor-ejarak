import React, { useState, useEffect } from "react";
import AccountDetailsNavbar from "../../components/common/accountDetails/AccountDetailsNavbar";
import StatusNavbar from "../../components/common/status/StatusNavbar";
import useFilteredData from "../../hooks/useFilteredData";
import { filterdContrancts } from "../../data/data";
import { getMyContracts } from "../../services/get/getMyContracts";
import Spinner from "../../components/common/Spinner";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import NoDataTitle from "../../components/common/NoDataTitle";
import ContractCard from "../../components/contracts/ContractCard";
const MyContracts = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [orginalContracts, setOrginalContracts] = useState([]);
  const { userData } = useSelector((state) => state.authSlice);
  const [filterdContracts, setFilterdContracts] = useState([]);
  const role = userData?.account?.type;
  const { isLoading, data } = useQuery(
    "my-contracts",
    () => getMyContracts(role),
    {
      onSuccess: (data) => setOrginalContracts(data?.data?.data),
    }
  );
  useEffect(() => {
    if (orginalContracts?.length > 0) {
      const value = filterdContrancts?.[activeIndex]?.value;
      const newData = orginalContracts?.filter((item) => item.type === value);
      setFilterdContracts(newData);
    }
  }, [orginalContracts, activeIndex, filterdContrancts]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-8 mt-8">
          <AccountDetailsNavbar />
          <div className="bg-white p-6 rounded-2xl shadow-2xl mt-5">
            <div className="mb-8">
              <StatusNavbar
                statusFilter={filterdContrancts}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            </div>
            {filterdContracts?.length ? (
              filterdContracts?.map((item, index) => (
                <div key={index}>
                  <ContractCard
                    title={item.booking.realestate.name}
                    realstateId={item.booking.realestate.id}
                    data={item.booking}
                    index={index}
                    role={role}
                    contractDate={item.created_at}
                    type={item.type}
                    contractId={item.booking.id}
                  />
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

export default MyContracts;
/**
 *
 */
