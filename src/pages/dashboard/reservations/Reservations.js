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
const itemsPerPage = 10;
const Reservations = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [filterdData, setFitlerdData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const queryClient = useQueryClient();
  const { isLoading, data } = useQuery("reservations", getReservations);
  useEffect(() => {
    if (data) {
      if (search) {
        setFitlerdData(
          data?.data?.data?.filter((item) =>
            item?.realestate?.name?.toLowerCase().includes(search.toLowerCase())
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
  const columns = [
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
      render: (value) => {
        return <TableStatus status={value} />;
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
            hasDelete={true}
            deleteAction={() => handleDelete(row.id)}
            viewAction={() =>
              navigate(`/dashboard/reservation-details/${row.id}`)
            }
          />
        );
      },
    },
  ];
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

export default Reservations;
