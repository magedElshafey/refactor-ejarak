import React, { useEffect, useRef, useState } from "react";

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

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaEye, FaTrash } from "react-icons/fa";

const itemsPerPage = 10;

const RealStatesBody = ({ tableSearch }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [popupOpen, setPopupOpen] = useState(false);
    const [rejectionReason, setRejectionReason] = useState("");
    const [selectedRowId, setSelectedRowId] = useState(null);
    const navigate = useNavigate();

    const queryClient = useQueryClient();
    const { isLoading, data } = useQuery(["realstates"], getDashboardRealstates);

    const mutation = useMutation(
        ({ status, id, rejectionReason }) => updateRealStateStatus(status, id, rejectionReason),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("realstates");
            }
        }
    );

    // * handle Table search 
    let filteredRealStates = data?.data?.data || [];
    filteredRealStates = tableSearch
        ? filteredRealStates.filter(realEstate => realEstate.name.includes(tableSearch))
        : filteredRealStates;


    useEffect(() => {
        setCurrentPage(0);
    }, [data?.data?.data]);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    };

    const offset = currentPage * itemsPerPage;
    const realStateData = filteredRealStates?.slice(offset, offset + itemsPerPage) || [];

    const handleStatusChange = (id, newStatus) => {
        if (newStatus === "refused") {
            setSelectedRowId(id);
            setPopupOpen(true);
        } else {
            mutation.mutate({ status: newStatus, id });
        }
    };

    const handlePopupSubmit = (message) => {
        mutation.mutate({ status: "refused", id: selectedRowId, reason_refused: message });
        setRejectionReason("");
    };

    const closePopup = () => {
        setPopupOpen(false);
        setSelectedRowId(null);
    };

    return (
        <>
            <RealStateTable data={realStateData} isLoading={isLoading} onStatusChange={handleStatusChange} />
            {data?.data?.data?.length > itemsPerPage ? (
                <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={data?.data?.data.length}
                    onPageChange={handlePageChange}
                    currentPage={currentPage}
                />
            ) : null}
            <RejectedPopup isOpen={popupOpen} closePopup={closePopup} onSubmit={handlePopupSubmit} />
        </>
    );
};

const RealStateTable = ({ data, isLoading, onStatusChange }) => {
    const navigate = useNavigate();

    const properties = (row) => [
        {
            title: "view",
            icon: <FaEye />,
            onClick: () => {
                navigate(``);
            }
        },
        {
            title: "delete",
            icon: <FaTrash />,
            onClick: () => {
                // Handle delete action
            }
        }
    ];

    const columns = [
        { title: "house title", dataIndex: "name" },
        { title: "houseOwner", dataIndex: "user.name" },
        { title: "house address", dataIndex: "city.name" },
        { title: "created date", dataIndex: "created_at", render: (date) => formatDateTime(date) },
        {
            title: "house status",
            dataIndex: "status",
            render: (status, row) => (
                <TableStatus status={status} onChange={(newStatus) => onStatusChange(row.id, newStatus)} />
            )
        },
        {
            title: "special realStates",
            dataIndex: "special",
            render: (special) => (
                <label className="inline-flex items-center me-5 cursor-pointer">
                    <input
                        type="checkbox"
                        value=""
                        checked={special === 1}
                        className="sr-only peer"
                    />
                    <div
                        className={`relative w-11 h-6 bg-gray-200 rounded-full dark:bg-gray-700 peer-checked:after:translate-x-[${special === 1 ? "-100%" : "0"
                            }] rtl:peer-checked:after:-translate-x-0 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600`}
                    ></div>
                </label>
            )
        },
        { title: "properties", render: (row) => <TableProperties items={properties} row={row} /> }
    ];

    return (
        <>
            {isLoading ? (
                <div className="pt-20 flex items-center justify-center">
                    <AiOutlineLoading3Quarters size={60} className="animate-spin text-maincolorgreen" />
                </div>
            ) : (
                <div className="max-w-screen overflow-x-auto">
                    <Table columns={columns} bodyData={data || []} />
                </div>
            )}
        </>
    );
};

export default RealStatesBody;
