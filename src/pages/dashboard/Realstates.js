import React, { useEffect, useState } from "react";
import Table from "../../components/dashboard/common/table/Table";
import { useQuery } from "react-query";
import { getDashboardRealstates } from "../../services/get/dashboard/getDashboardRealstates";
import { formatDateTime } from "../../utils/formateDateTime";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import TableProperties from "../../components/dashboard/common/table/TableProperties";
import Pagination from "../../components/common/Pagination"
import { FaEye, FaPencilAlt, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import getStatusBackgroundColor from "../../utils/dashboard/getStatusBackgroundColor";
import { useTranslation } from "react-i18next";

const itemsPerPage = 10;

const Realstates = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { isLoading, data } = useQuery(["realstates"], getDashboardRealstates);

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
  const realStateData = data?.data?.data?.slice(offset, offset + itemsPerPage) || [];

  return (
    <>
      <RealStateTable data={realStateData} isLoading={isLoading} />
      {data?.data?.data?.length > itemsPerPage ? (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={data?.data?.data.length}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      ) : null}
    </>
  );
};

const RealStateTable = ({ data, isLoading }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  //  * table properties ( delete , view )
  const properties = (row) => {
    return [
      {
        title: "view",
        icon: <FaEye />,
        onClick: () => {
          navigate(`/dashboard/static-pages/view-faq/${row.id}`)
        }
      },

      {
        title: "edit",
        icon: <FaPencilAlt />,
        onClick: () => {
          navigate(`/dashboard/static-pages/edit-faq/${row.id}`);
        }
      },
      {
        title: "delete",
        icon: <FaTrash />,
        onClick: () => {

        }
      },
    ]
  }

  // * table data ( header titles , body data ) 
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
      dataIndex: "status",
      render: (row) => {
        console.log(row);

        return (
          <p
            className={`p-1 text-sm rounded-full text-black ${getStatusBackgroundColor(
              row
            )}`}
          >
            {t(row)}
          </p>
        )
      }
    },
    {
      title: "special realStates",
      dataIndex: "special",
      render: (row) => {
        return (
          <label className="inline-flex items-center me-5 cursor-pointer">
            <input
              type="checkbox"
              value=""
              checked={row === 1}
              className="sr-only peer"
            // onClick={toggleSpecialStatus}
            />
            <div
              className={`relative w-11 h-6 bg-gray-200 rounded-full dark:bg-gray-700 peer-checked:after:translate-x-[${row === 1 ? "-100%" : "0"
                }] rtl:peer-checked:after:-translate-x-0 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600`}
            ></div>
          </label>
        );
      }
    },
    {
      title: "properties",
      render: (row) => {
        return (
          <TableProperties items={properties} row={row} />
        )
      },
    },
  ];
  return (
    <>
      {isLoading ?
        <div className="pt-20 flex items-center justify-center">
          <AiOutlineLoading3Quarters size={60} className="animate-spin text-maincolorgreen" />
        </div>
        :
        <div className=" max-w-screen overflow-x-auto">
          <Table columns={columns} bodyData={data || []} />
        </div>
      }
    </>
  )
}
export default Realstates;
