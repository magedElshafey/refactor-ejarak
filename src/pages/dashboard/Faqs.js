import React, { useState, useEffect } from "react";
import MainBtn from "../../components/common/buttons/MainBtn";
import { useNavigate } from "react-router-dom";
import Table from "../../components/dashboard/common/table/Table";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getFaq } from "../../services/get/dashboard/getFaqs";
import Spinner from "../../components/common/Spinner";
import Pagination from "../../components/common/Pagination";
import TableProperties from "../../components/dashboard/common/table/TableProperties";
import { deleteFaq } from "../../services/delete/dashboard/deleteFaq";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
const itemsPerPage = 10;

const Faqs = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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
  const { isLoading: loadingDelete, mutate } = useMutation(
    (i, v) => deleteFaq(i, v),
    {
      onSuccess: (data) => {
        if (data?.data?.status) {
          Swal.fire({
            icon: "success",
            title: data?.data?.message,
          });
          queryClient.invalidateQueries("faqs");
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
      text: t("do you sure you want to remove the faq"),
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
      render: (value, row) => {
        return (
          <TableProperties
            hasDelete={true}
            hasEdit={true}
            hasView={true}
            viewAction={() => navigate(`/dashboard/faq-details/${row.id}`)}
            editAction={() => navigate(`/dashboard/faqs/edit/${row.id}`)}
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
