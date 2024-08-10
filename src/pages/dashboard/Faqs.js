import React, { useState, useEffect } from "react";
import MainBtn from "../../components/common/buttons/MainBtn";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Table from "../../components/dashboard/common/table/Table";
import { useQuery } from "react-query";
import { getFaq } from "../../services/get/dashboard/getFaqs";
import Spinner from "../../components/common/Spinner";
import { FaEye, FaPencilAlt, FaTrash } from "react-icons/fa";
import Pagination from "../../components/common/Pagination";
import TableProperties from "../../components/dashboard/common/table/TableProperties";
import { render } from "@testing-library/react";
const itemsPerPage = 10;
const columns = [
  {
    title: "question",
    dataIndex: "question",
    render: (value) => {
      return <p dangerouslySetInnerHTML={{ __html: value }}></p>;
    },
  },
  {
    title: "answer",
    dataIndex: "answer",
    render: (value) => {
      return <p dangerouslySetInnerHTML={{ __html: value }}></p>;
    },
  },
  {
    title: "properties",
    dataIndex: "",
  },
];
const Faqs = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const properties = (row) => {
    return [
      {
        title: "view",
        icon: <FaEye />,
        onClick: () => {
          navigate(`/dashboard/static-pages/view-faq/${row.id}`);
        },
      },

      {
        title: "edit",
        icon: <FaPencilAlt />,
        onClick: () => {
          navigate(`/dashboard/static-pages/edit-faq/${row.id}`);
        },
      },
      {
        title: "delete",
        icon: <FaTrash />,
        onClick: () => {},
      },
    ];
  };
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleNavigate = () => navigate("/dashboard/faqs/add");
  const { isLoading, data } = useQuery("faqs", getFaq);
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

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-8 mt-5">
          <div className="flex items-center justify-between gap-4 md:gap-6 lg:gap-12 mb-8">
            <div className="flex-1"></div>
            <div className="w-[150px] md:w-[200px]">
              <MainBtn text="add question" action={handleNavigate} />
            </div>
          </div>
          <Table
            columns={columns}
            bodyData={
              data?.data?.data?.slice(offset, offset + itemsPerPage) || []
            }
          />
          {data?.data?.data?.length > itemsPerPage ? (
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={data?.data?.data.length}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          ) : null}
        </div>
      )}
    </>
  );
};

export default Faqs;
