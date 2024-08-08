import React from "react";
import Table from "../../components/dashboard/common/table/Table";
import { useQuery } from "react-query";
import { getDashboardRealstates } from "../../services/get/dashboard/getDashboardRealstates";
import Spinner from "../../components/common/Spinner";
import { formatDateTime } from "../../utils/formateDateTime";
const columns = [
  {
    title: "house title",
    dataIndex: "name",
  },
  {
    title: "houseOwner",
    dataIndex: "user.name",
  },
  {
    title: "house address",
    dataIndex: "city.name",
  },
  {
    title: "created date",
    dataIndex: "created_at",
    render: (date) => {
      return formatDateTime(date);
    },
  },
  {
    title: "house status",
    dataIndex: "course_name",
  },
  {
    title: "special realStates",
    dataIndex: "course_name",
  },
  {
    title: "properties",
    dataIndex: "course_name",
  },
];
const Realstates = () => {
  const { isLoading, data } = useQuery(["realstates"], getDashboardRealstates);
  console.log("data from realstate dashboard", data);
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-8 mt-5">
          <Table columns={columns} bodyData={data?.data?.data || []} />
        </div>
      )}
    </>
  );
};

export default Realstates;
