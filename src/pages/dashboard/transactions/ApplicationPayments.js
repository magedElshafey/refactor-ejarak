import React, { useState, useEffect } from "react";
import SearchInput from "../../../components/dashboard/common/SearchInput";
import Paginate from "../../../components/common/Pagination";
import Table from "../../../components/dashboard/common/table/Table";
import { useQuery } from "react-query";
import Spinner from "../../../components/common/Spinner";
import { useTranslation } from "react-i18next";
import { getApplicationPayment } from "../../../services/get/dashboard/getApplicationPayment";
const itemsPerPage = 10;
const ApplicationPayments = () => {
  const { t } = useTranslation();
  const [filterdData, setFitlerdData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const { isLoading, data } = useQuery(
    "application-transaction",
    getApplicationPayment,
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
  useEffect(() => {
    if (data) {
      if (search) {
        setFitlerdData(
          data?.data?.data?.filter((item) =>
            item?.realestate_name?.toLowerCase().includes(search?.toLowerCase())
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
      title: "transaction number",
      dataIndex: "transaction_id",
    },
    {
      title: "transaction type",
      dataIndex: "type",
      render: (value) => {
        return <p>{t(value)}</p>;
      },
    },
    {
      title: "amount",
      dataIndex: "amount",
    },
    {
      title: "realstate name",
      dataIndex: "realestate_name",
    },
    {
      title: "name",
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
      title: "id",
      dataIndex: "user.nationalId",
    },
  ];
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-8 mt-6">
          <div className="w-full md:w-1/2 mb-5">
            <SearchInput onSearchChange={setSearch} />
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

export default ApplicationPayments;
