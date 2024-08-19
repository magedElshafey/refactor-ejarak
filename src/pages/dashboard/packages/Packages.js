import React, { useState, useEffect } from "react";
import Table from "../../../components/dashboard/common/table/Table";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Spinner from "../../../components/common/Spinner";
import MainBtn from "../../../components/common/buttons/MainBtn";
import { useNavigate } from "react-router-dom";
import { getPackages } from "../../../services/get/dashboard/getPackages";
import TableProperties from "../../../components/dashboard/common/table/TableProperties";
import Pagination from "../../../components/common/Pagination";
import SearchInput from "../../../components/dashboard/common/SearchInput";
import Swal from "sweetalert2";
import { deletePackage } from "../../../services/delete/dashboard/deletePackage";
import { useTranslation } from "react-i18next";
const itemsPerPage = 10;
const Packages = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [filterdData, setFitlerdData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const queryClient = useQueryClient();
  const handleNavigate = () => navigate("/dashboard/add-package");
  const { isLoading, data } = useQuery("packages", getPackages, {
    onSuccess: (data) => {
      if (data?.data?.status) {
        setFitlerdData(data?.data?.data);
      } else {
        setFitlerdData([]);
      }
    },
  });
  useEffect(() => {
    if (data) {
      if (search) {
        setFitlerdData(
          data?.data?.data?.filter((item) =>
            item?.name?.toLowerCase().includes(search.toLowerCase())
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
  const { isLoading: loadingDelete, mutate } = useMutation(
    (i, v) => deletePackage(i, v),
    {
      onSuccess: (data) => {
        if (data?.data?.status) {
          Swal.fire({
            icon: "success",
            title: data?.data?.message,
          });
          queryClient.invalidateQueries("packages");
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
      text: t("do you sure you want to remove the package"),
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
    {
      title: "package name",
      dataIndex: "name",
    },
    {
      title: "package price",
      dataIndex: "price",
    },
    {
      title: "contractors count",
      dataIndex: "no_contracts",
    },
    {
      title: "notes",
      dataIndex: "notes",
    },
    {
      title: "properties",
      dataIndex: "",
      render: (value, row) => {
        return (
          <TableProperties
            hasEdit={true}
            hasView={true}
            hasDelete={true}
            viewAction={() => navigate(`/dashboard/package-details/${row.id}`)}
            editAction={() => navigate(`/dashboard/edit-package/${row.id}`)}
            deleteAction={() => handleDelete(row.id)}
            disabled={loadingDelete}
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
          <div className="w-full mb-8 flex items-center justify-between gap-5 flex-wrap">
            <div className="w-1/2 flex-1">
              <SearchInput onSearchChange={setSearch} />
            </div>
            <div className="w-full md:w-[180px]">
              <MainBtn text="add package" action={handleNavigate} />
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

export default Packages;
