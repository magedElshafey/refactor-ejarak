import React, { useState, useEffect } from "react";
import Table from "../../components/dashboard/common/table/Table";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Spinner from "../../components/common/Spinner";
import Pagination from "../../components/common/Pagination";
import SearchInput from "../../components/dashboard/common/SearchInput";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
// import { MdFilterAlt } from "react-icons/md";
// import { getCategories } from "../../services/get/dashboard/getCategories";
// import MainSelect from "../../components/common/inputs/MainSelect";
import { request } from "../../services/axios";
import { formatDateTime } from "../../utils/formateDateTime";
// import {
//   filterdReservationDashboardAr,
//   filterdReservationDashboardEn,
// } from "../../data/data";
import { getBooking } from "./getBooking";
import StepProgress from "../../components/common/reservations/StepProgress";
import { FaEye } from "react-icons/fa";
const itemsPerPage = 10;
const handleVerifcation = (contractId) => {
  return request({
    url: `/booking-contracts/approve/${contractId}`,
    method: "POST",
  });
};
const TrackStatus = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  // const [dateFrom, setDateFrom] = useState("");
  // const handleDateFromChange = (e) => setDateFrom(e.target.value);
  // const [dateTo, setDateTo] = useState("");
  // const handleDateToChange = (e) => setDateTo(e.target.value);
  // const getTodayDateFormatted = () => {
  //   const today = new Date();
  //   const yyyy = today.getFullYear();
  //   const mm = String(today.getMonth() + 1).padStart(2, "0"); // الشهر من 0 إلى 11
  //   const dd = String(today.getDate()).padStart(2, "0");
  //   return `${yyyy}-${mm}-${dd}`;
  // };
  // const { isLoading: loadinCategories, data: categories } = useQuery(
  //   "categories",
  //   getCategories
  // );
  const [filterdData, setFitlerdData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  // const [showFilter, setShowFilter] = useState(false);
  // const handleShowFilter = () => setShowFilter(!showFilter);
  // const [reservationState, setReservationState] = useState("");
  // const handleReservationStateChnage = (opt) => setReservationState(opt.id);
  // const [realstateType, setRealstateType] = useState("");
  // const handleRealstateTypeChange = (opt) => setRealstateType(opt.id);
  // const to = dateTo ? dateTo : getTodayDateFormatted();
  const { isLoading, data } = useQuery("get-booking", () => getBooking());
  useEffect(() => {
    if (data) {
      if (search) {
        setFitlerdData(
          data?.data?.data?.filter((item) =>
            item?.realestate?.name
              ?.toLowerCase()
              .includes(search?.toLowerCase())
          )
        );
      } else {
        setFitlerdData(data?.data?.data);
      }
    }
  }, [data, search]);
  useEffect(() => {
    setCurrentPage(0);
  }, [filterdData]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const offset = currentPage * itemsPerPage;
  const { isLoading: loadingVerifcationContract, mutate } = useMutation(
    (id) => handleVerifcation(id),
    {
      onSuccess: (data) => {
        console.log("data from suc", data);
        queryClient.invalidateQueries("get-booking");
      },
      onError: (data) => {
        console.log("data from err", data);
        Swal.fire({
          icon: "error",
          title: t("advertise field are required"),
        });
      },
    }
  );

  const columns = [
    {
      title: "date",
      dataIndex: "created_at",
      render: (date) => {
        return formatDateTime(date, true);
      },
    },
    {
      title: "house title",
      dataIndex: "reality",
    },
    {
      title: "houseType",
      dataIndex: "realestate.category.name",
    },

    {
      title: "status",
      dataIndex: "status_name",
      render: (status) => {
        return <StepProgress status={status} />;
      },
    },
    {
      title: "properties",
      dataIndex: "",
      render: (_, row) => {
        console.log("row", row);
        return (
          <div className="flex items-center justify-center gap-3">
            {row?.status_name === "contract_created" && (
              <button
                disabled={loadingVerifcationContract}
                onClick={() => mutate(row.contract_id)}
                className="py-2 px-4 flex items-center justify-center bg-maincolorgreen text-white rounded-md cursor-pointer disabled:cursor-not-allowed disabled:opacity-30"
              >
                {t("verify contract")}
              </button>
            )}
            <Link to={`/dashboard/reservation-details/${row.id}`}>
              <FaEye size={20} className=" cursor-pointer" />
            </Link>
          </div>
        );
      },
    },
  ];
  // const newAccountType = {
  //   name: t("all"), // Assuming `t` is your translation function
  //   id: "",
  // };

  // const handleReset = () => {
  //   // setDateFrom("");
  //   // setDateTo("");
  //   setSearch("");
  //   setReservationState("");
  //   setRealstateType("");
  // };
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-8 mt-5">
          <div className="w-full mb-8 flex items-center justify-between gap-5">
            <div className="md:w-1/2">
              <SearchInput onSearchChange={setSearch} />
            </div>
          </div>
          {/* <div
            className={`w-full relative p-3 flex items-center justify-between gap-4 flex-wrap  rounded-lg bg-white shadow-sm my-8 duration-300 border border-slate-500 ${
              showFilter ? "block opacity-100" : "hidden opacity-0"
            }`}
          > */}
          {/* <div className="flex-1 flex items-center gap-3"> */}
          {/* <div className="w-[180px]">
                <MainSelect
                  onSelect={handleRealstateTypeChange}
                  loading={loadinCategories}
                  label="realstate types"
                  options={[newAccountType, ...categories?.data?.data] || []}
                  value={
                    realstateType === ""
                      ? t("all")
                      : categories?.data?.data?.find(
                          (item) => item?.id === +realstateType
                        )?.name
                  }
                />
              </div>
              <div className="w-[250px]">
                <MainSelect
                  label="reservation status"
                  options={
                    i18n.language === "ar"
                      ? filterdReservationDashboardAr
                      : filterdReservationDashboardEn
                  }
                  onSelect={handleReservationStateChnage}
                  value={
                    i18n.language === "en"
                      ? filterdReservationDashboardEn?.find(
                          (item) => item?.id === reservationState
                        )?.name
                      : filterdReservationDashboardAr?.find(
                          (item) => item?.id === reservationState
                        )?.name
                  }
                />
              </div> */}
          {/* <div className="w-[250px]">
                <label className="block mb-1" htmlFor="date-from">
                  {t("date-from")}
                </label>
                <input
                  type="date"
                  id="date-from"
                  className="w-full border border-[#9399A3] p-3 rounded-xl focus:outline-none  bg-transparent"
                  value={dateFrom}
                  onChange={handleDateFromChange}
                />
              </div>
              <div className="w-[250px]">
                <label className="block mb-1" htmlFor="date-to">
                  {t("date-to")}
                </label>
                <input
                  type="date"
                  id="date-to"
                  className="w-full border border-[#9399A3] p-3 rounded-xl focus:outline-none  bg-transparent"
                  value={dateTo}
                  onChange={handleDateToChange}
                />
              </div> */}
          {/* </div> */}
          {/* <button
              className="w-[150px] flex items-center justify-center bg-red-600 text-white p-3 rounded-xl"
              onClick={handleReset}
            >
              {t("reset")}
            </button> */}
          {/* </div> */}
          <Table
            columns={columns}
            bodyData={filterdData.slice(offset, offset + itemsPerPage) || []}
          />
          {filterdData?.length > itemsPerPage ? (
            <div className="mt-12">
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={filterdData.length}
                onPageChange={handlePageChange}
                currentPage={currentPage}
              />
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default TrackStatus;
