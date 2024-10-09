import React, { useState } from "react";

import { getDashboardRealstates } from "../../../services/get/dashboard/getDashboardRealstates";
import TableProperties from "../../../components/dashboard/common/table/TableProperties";
import TableStatus from "../../../components/dashboard/common/table/TableStatus";
import RejectedPopup from "../../../components/dashboard/common/RejectedPopup";
import Table from "../../../components/dashboard/common/table/Table";
import Pagination from "../../../components/common/Pagination";
import { useNavigate } from "react-router-dom";

import updateRealStateStatus from "../../../services/post/dashboard/updateRealStateStatus";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { formatDateTime } from "../../../utils/formateDateTime";

import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { deleteRealState } from "../../../services/delete/dashboard/deleteRealState";
import { getSpecialRealState } from "../../../services/get/dashboard/getSpecialRealState";
import Spinner from "../../common/Spinner";
import { useSelector } from "react-redux";
const itemsPerPage = 10;

const RealStatesBody = ({ tableSearch }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [selectedRowId, setSelectedRowId] = useState(null);

  const queryClient = useQueryClient();
  const { isLoading, data } = useQuery(["realstates"], getDashboardRealstates);

  const { isLoading: loadingStatus, mutate } = useMutation(
    ({ status, id, rejectionReason }) =>
      updateRealStateStatus(status, id, rejectionReason),
    {
      onSuccess: (data) => {
        if (data?.data?.status) {
          Swal.fire({
            icon: "success",
            title: data?.data?.message,
          });
          queryClient.invalidateQueries("realstates");
          setRejectionReason("");
          setSelectedRowId("");
          setPopupOpen(false); // أغلق الـ popup بعد النجاح
        } else {
          Swal.fire({
            icon: "error",
            title: data?.response?.data?.message,
          });
        }
      },
      onError: (error) => {
        Swal.fire({
          icon: "error",
          title: "An error occurred",
          text: error?.response?.data?.message || "Unknown error",
        });
      },
    }
  );

  // * handle Table search
  let filteredRealStates = data?.data?.data || [];
  filteredRealStates = tableSearch
    ? filteredRealStates.filter((realEstate) =>
        realEstate.name.includes(tableSearch)
      )
    : filteredRealStates;

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const offset = currentPage * itemsPerPage;
  const realStateData =
    filteredRealStates?.slice(offset, offset + itemsPerPage) || [];
  const handleStatusChange = (id, newStatus) => {
    if (newStatus === "refused") {
      setSelectedRowId(id);
      setPopupOpen(true);
    } else {
      mutate({ status: newStatus, id });
    }
  };

  const handlePopupSubmit = (v) => {
    const data = {
      status: "refused",
      id: selectedRowId,
      rejectionReason: v,
    };
    mutate(data);
  };
  const closePopup = () => {
    setPopupOpen(false);
    setSelectedRowId(null);
  };
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <RealStateTable
            data={realStateData}
            onStatusChange={handleStatusChange}
          />
          {filteredRealStates?.length > itemsPerPage ? (
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={data?.data?.data.length}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          ) : null}
          <RejectedPopup
            isOpen={popupOpen}
            closePopup={closePopup}
            onSubmit={handlePopupSubmit}
          />
        </>
      )}
    </>
  );
};

const RealStateTable = ({ data, onStatusChange }) => {
  const { userData } = useSelector((state) => state.authSlice);
  const userId = userData?.id || null;

  const navigate = useNavigate();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { isLoading: loadingDelete, mutate } = useMutation(
    (i, v) => deleteRealState(i, v),
    {
      onSuccess: (data) => {
        if (data?.data?.status) {
          Swal.fire({
            icon: "success",
            title: data?.data?.message,
          });
          queryClient.invalidateQueries("realstates");
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
      text: t("do you sure you want to remove the real state"),
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

  const columns = [
    { title: "house title", dataIndex: "name" },
    { title: "houseOwner", dataIndex: "user.name" },
    { title: "house address", dataIndex: "city.name" },
    {
      title: "created date",
      dataIndex: "created_at",
      render: (date) => formatDateTime(date),
    },
    {
      title: "house status",
      dataIndex: "status",
      render: (status, row) => (
        <TableStatus
          status={status}
          onChange={(newStatus) => onStatusChange(row.id, newStatus)}
        />
      ),
    },
    {
      title: "special realStates",
      dataIndex: "special",
      render: (special, row) => <RowStatus row={row} />,
    },
    {
      title: "properties",
      render: (value, row) => (
        <>
          <TableProperties
            hasView={true}
            hasDelete={value === "super_admin" ? false : true}
            viewAction={() => navigate(`/dashboard/realstate/${row.id}`)}
            deleteAction={() => handleDelete(row.id)}
            disabled={loadingDelete}
            hasEdit={userId === row?.user?.id}
            editAction={() => navigate(`/website/edit-realstate/${row.id}`)}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <div className="max-w-screen overflow-x-auto">
        <Table columns={columns} bodyData={data || []} />
      </div>
    </>
  );
};

const RowStatus = ({ row }) => {
  const queryClient = useQueryClient();

  const { isLoading: specialLoading, mutate: specialRealStateMutate } =
    useMutation(
      (id) => getSpecialRealState(id),

      {
        onSuccess: (data) => {
          if (data?.data?.status) {
            Swal.fire({
              icon: "success",
              title: data?.data?.message,
            });
            queryClient.invalidateQueries("realstates");
          } else {
            Swal.fire({
              icon: "error",
              title: data?.response?.data?.message,
            });
          }
        },
      }
    );

  const handleSpecialRealState = (id) => {
    specialRealStateMutate(id);
  };

  return (
    <label className="inline-flex items-center me-5 cursor-pointer">
      <>
        <input
          type="checkbox"
          value=""
          checked={row.special === 1}
          className="sr-only peer"
          onChange={() => handleSpecialRealState(row.id)}
        />
        <div
          className={`relative w-11 h-6 bg-gray-200 rounded-full dark:bg-gray-700 peer-checked:after:translate-x-[${
            row.special === 1 ? "-100%" : "0"
          }] rtl:peer-checked:after:-translate-x-0 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600`}
        ></div>
      </>
    </label>
  );
};
export default RealStatesBody;
