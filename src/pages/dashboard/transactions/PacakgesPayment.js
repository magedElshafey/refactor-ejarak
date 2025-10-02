import React, { useState, useEffect } from "react";
import SearchInput from "../../../components/dashboard/common/SearchInput";
import Paginate from "../../../components/common/Pagination";
import Table from "../../../components/dashboard/common/table/Table";
import { useQuery } from "react-query";
import Spinner from "../../../components/common/Spinner";
import { useTranslation } from "react-i18next";
import { getPackagesPayment } from "../../../services/get/dashboard/getPackagesPayment";
import ExportButton from "../../../components/common/ExportButton";
const itemsPerPage = 10;
const PacakgesPayment = () => {
  const { t } = useTranslation();
  const [filterdData, setFitlerdData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const { isLoading, data } = useQuery(
    "package-transaction",
    getPackagesPayment,
    {
      onSuccess: (data) => {
        if (data?.data?.status) {
          setFitlerdData(data?.data?.data);
        } else {
          setFitlerdData([]);
        }
      },
    }
  );
  console.log("data from packages payment is : ", data?.data?.data);
  useEffect(() => {
    if (data) {
      if (search) {
        setFitlerdData(
          data?.data?.data?.filter((item) =>
            item?.package?.name?.toLowerCase().includes(search?.toLowerCase())
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
  const columns = [
    {
      title: "package name",
      dataIndex: "package.name",
    },
    {
      title: "user name",
      dataIndex: "user.name",
    },
    {
      title: "email",
      dataIndex: "user.email",
      render: (value) => <p className=" lowercase">{value}</p>,
    },
    {
      title: "mobilePhone",
      dataIndex: "user.phone",
    },
    {
      title: "amount",
      dataIndex: "package.price",
    },
    // {
    //   title: "id",
    //   dataIndex: "user.nationalId",
    // },
  ];
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-8 mt-6">
          <div className="flex items-center justify-between ">
            <div className=" md:w-1/2 mb-5">
              <SearchInput onSearchChange={setSearch} />
            </div>
            <ExportButton
              excelEndpoint="/Dashboard/subscription/export"
              pdfEndpoint="/Dashboard/subscription/export_pdf"
              fileName="packages"
            />
          </div>

          <Table
            columns={columns}
            bodyData={filterdData?.slice(offset, offset + itemsPerPage) || []}
          />
          {filterdData?.length > itemsPerPage ? (
            <div className="mt-12">
              <Paginate
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

export default PacakgesPayment;
