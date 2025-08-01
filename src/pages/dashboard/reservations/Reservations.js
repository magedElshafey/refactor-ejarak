import React, { useState, useEffect } from "react";
import Table from "../../../components/dashboard/common/table/Table";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Spinner from "../../../components/common/Spinner";
import TableProperties from "../../../components/dashboard/common/table/TableProperties";
import Pagination from "../../../components/common/Pagination";
import SearchInput from "../../../components/dashboard/common/SearchInput";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { getReservations } from "../../../services/get/dashboard/getReservations";
import { useNavigate } from "react-router-dom";
import TableStatus from "../../../components/dashboard/common/table/TableStatus";
import { deleteReservation } from "../../../services/delete/dashboard/deleteReservation";
import { updateReservationStatus } from "../../../services/get/dashboard/updateReservationStatus";
import RejectedPopup from "../../../components/dashboard/common/RejectedPopup";
import { getCurrentDate } from "../../../utils/getCurrentDate";
import { MdFilterAlt } from "react-icons/md";
import { getCategories } from "../../../services/get/dashboard/getCategories";
import MainSelect from "../../../components/common/inputs/MainSelect";
import { request } from "../../../services/axios";
import { formatDateTime } from "../../../utils/formateDateTime";
import {
  filterdReservationDashboardAr,
  filterdReservationDashboardEn,
} from "../../../data/data";
import { FaFileExport } from "react-icons/fa";
const itemsPerPage = 10;
const Reservations = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [dateFrom, setDateFrom] = useState("");
  const handleDateFromChange = (e) => setDateFrom(e.target.value);
  const [dateTo, setDateTo] = useState("");
  const handleDateToChange = (e) => setDateTo(e.target.value);
  const getTodayDateFormatted = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // الشهر من 0 إلى 11
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };
  const { isLoading: loadinCategories, data: categories } = useQuery(
    "categories",
    getCategories
  );
  const [filterdData, setFitlerdData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const queryClient = useQueryClient();
  const [showFilter, setShowFilter] = useState(false);
  const handleShowFilter = () => setShowFilter(!showFilter);
  const [reservationState, setReservationState] = useState("");
  const handleReservationStateChnage = (opt) => setReservationState(opt.id);
  const [realstateType, setRealstateType] = useState("");
  const handleRealstateTypeChange = (opt) => setRealstateType(opt.id);
  const to = dateTo ? dateTo : getTodayDateFormatted();
  const { isLoading, data } = useQuery(
    ["reservations", realstateType, reservationState, dateFrom, to],
    () => getReservations(realstateType, reservationState, dateFrom, to)
  );
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
  const { isLoading: loadingDelete, mutate } = useMutation(
    (i, v) => deleteReservation(i, v),
    {
      onSuccess: (data) => {
        if (data?.data?.status) {
          Swal.fire({
            icon: "success",
            title: data?.data?.message,
          });
          queryClient.invalidateQueries("reservations");
        } else {
          Swal.fire({
            icon: "error",
            title: data?.response?.data?.message,
          });
        }
      },
    }
  );
  const handleDelete = (i) => {
    Swal.fire({
      text: t("do you sure you want to remove the reservation"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("del"),
      cancelButtonText: t("cancel"),
    }).then((res) => {
      if (res.isConfirmed) {
        const data = {};
        mutate(i, data);
      } else {
        return;
      }
    });
  };
  const offset = currentPage * itemsPerPage;
  const [popupOpen, setPopupOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [selectedRowId, setSelectedRowId] = useState(null);
  const closePopup = () => {
    setPopupOpen(false);
    setSelectedRowId(null);
  };

  const {
    isLoading: loadingReservationStatus,
    mutate: mutateReservationStatus,
  } = useMutation(({ i, v }) => updateReservationStatus(i, v), {
    onSuccess: (data) => {
      if (data?.data?.status) {
        Swal.fire({
          icon: "success",
          title: data?.data?.message,
        });
        queryClient.invalidateQueries("reservations");
      } else {
        Swal.fire({
          icon: "error",
          title: data?.response?.data?.message,
        });
      }
    },
  });

  const handleStatusChange = (id, newStatus) => {
    if (newStatus === "refused") {
      setSelectedRowId(id);
      setPopupOpen(true);
    } else {
      const data = new FormData();
      data.append("status", "accepted");
      data.append("accepted_at", getCurrentDate());
      mutateReservationStatus({ i: id, v: data });
    }
  };

  const handlePopupSubmit = (rejectionReason) => {
    if (!rejectionReason.trim()) {
      Swal.fire({
        icon: "error",
        title: t("refused reason field is required"),
      });
      return;
    } else {
      const data = {
        status: "refused",
        id: selectedRowId,
        reason_refused: rejectionReason,
      };
      mutateReservationStatus({ i: selectedRowId, v: data });

      setRejectionReason("");
    }
  };

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
      dataIndex: "realestate.name",
    },
    {
      title: "houseType",
      dataIndex: "realestate.category.name",
    },
    {
      title: "houseOwner",
      dataIndex: "realestate.user.name",
    },
    {
      title: "tentName",
      dataIndex: "tenant.name",
    },
    {
      title: "reservationPeriod",
      dataIndex: "contract_period",
      render: (value) => {
        return (
          <p>
            {value} {t("months")}
          </p>
        );
      },
    },
    {
      title: "reservationStatus",
      dataIndex: "status",
      render: (status, row) => {
        return (
          <TableStatus
            status={status}
            onChange={(newStatus) => handleStatusChange(row.id, newStatus)}
            hasNotChange={row.realestate?.user?.account?.type !== "super_admin"}
          />
        );
      },
    },
    {
      title: "properties",
      dataIndex: "",
      render: (value, row) => {
        return (
          <TableProperties
            hasEdit={false}
            hasView={true}
            hasDelete={false}
            // deleteAction={() => handleDelete(row.id)}
            viewAction={() =>
              navigate(`/dashboard/reservation-details/${row.id}`)
            }
          />
        );
      },
    },
  ];
  const newAccountType = {
    name: t("all"), // Assuming `t` is your translation function
    id: "",
  };
  const handleExport = async () => {
    const response = await request({
      url: `/Dashboard/bookings/export`,
      method: "GET",
      responseType: "blob",
    });
    const blob = new Blob([response], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "users.xlsx";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    return true;
  };

  const { refetch, isFetching: isLoadingExport } = useQuery(
    ["exports"],
    handleExport,
    {
      enabled: false,
    }
  );
  const handleReset = () => {
    setDateFrom("");
    setDateTo("");
    setSearch("");
    setReservationState("");
    setRealstateType("");
  };
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
            <div className="flex items-center gap-3 flex-col lg:flex-row">
              <button
                onClick={handleShowFilter}
                className="flex items-center justify-center gap-3 p-3 bg-white text-maincolorgreen font-semibold border border-slate-400 rounded-lg min-w-[140px]"
              >
                <p>{t("filter")}</p>
                <MdFilterAlt size={20} />
              </button>
              <button
                disabled={isLoadingExport}
                onClick={() => refetch()}
                className="w-10 h-10 flex items-center justify-center border bg-white text-maincolorgreen disabled:bg-opacity-30 disabled:cursor-not-allowed"
              >
                <FaFileExport size={20} />
              </button>
            </div>
          </div>
          <div
            className={`w-full relative p-3 flex items-center justify-between gap-4 flex-wrap  rounded-lg bg-white shadow-sm my-8 duration-300 border border-slate-500 ${
              showFilter ? "block opacity-100" : "hidden opacity-0"
            }`}
          >
            <div className="flex-1 flex items-center gap-3">
              <div className="w-[180px]">
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
              </div>
              <div className="w-[250px]">
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
              </div>
            </div>
            <button
              className="w-[150px] flex items-center justify-center bg-red-600 text-white p-3 rounded-xl"
              onClick={handleReset}
            >
              {t("reset")}
            </button>
          </div>
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
          <RejectedPopup
            isOpen={popupOpen}
            closePopup={closePopup}
            onSubmit={handlePopupSubmit}
          />
        </div>
      )}
    </>
  );
};

export default Reservations;
