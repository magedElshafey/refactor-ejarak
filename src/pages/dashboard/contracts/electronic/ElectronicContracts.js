import React, { useState, useEffect } from "react";
import Table from "../../../../components/dashboard/common/table/Table";
import Spinner from "../../../../components/common/Spinner";
import TableProperties from "../../../../components/dashboard/common/table/TableProperties";
import Pagination from "../../../../components/common/Pagination";
import SearchInput from "../../../../components/dashboard/common/SearchInput";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getElectronicContracts } from "../../../../services/get/dashboard/getElectronicContracts";
import { formatDateTime } from "../../../../utils/formateDateTime";
const itemsPerPage = 10;
const ElectronicContracts = () => {
  const [filterdData, setFitlerdData] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const { isLoading, data } = useQuery(
    "contracts-electronic",
    getElectronicContracts
  );
  const columns = [
    {
      title: "date",
      dataIndex: "created_at",
      render: (v) => <p>{formatDateTime(v, true)}</p>,
    },
    {
      title: "house title",
      dataIndex: "booking.realestate.name",
    },
    {
      title: "lessorName",
      dataIndex: "booking.realestate.user.name",
    },
    {
      title: "lessorId",
      dataIndex: "booking.realestate.user.nationalId",
    },
    {
      title: "tentName",
      dataIndex: "booking.tenant.name",
    },
    {
      title: "tentName",
      dataIndex: "booking.tenant.nationalId",
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
            viewAction={() =>
              navigate(
                `/dashboard/electronic-contracts-details/${row.booking.id}`
              )
            }
          />
        );
      },
    },
  ];
  useEffect(() => {
    if (data) {
      if (search) {
        setFitlerdData(
          data?.data?.data?.filter((item) =>
            item?.booking?.realestate?.name
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
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-8 mt-6">
          <div className="md:w-1/2 mb-8">
            <SearchInput onSearchChange={setSearch} />
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

export default ElectronicContracts;
