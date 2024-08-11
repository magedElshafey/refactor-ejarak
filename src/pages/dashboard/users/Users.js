import React, { useState, useEffect } from "react";
import SearchInput from "../../../components/dashboard/common/SearchInput";
import MainBtn from "../../../components/common/buttons/MainBtn";
import Paginate from "../../../components/common/Pagination";
import Table from "../../../components/dashboard/common/table/Table";
import TableProperties from "../../../components/dashboard/common/table/TableProperties";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Spinner from "../../../components/common/Spinner";
import { getUsers } from "../../../services/get/dashboard/getUsers";
import Swal from "sweetalert2";
import { FaRegCircleDot } from "react-icons/fa6";
const itemsPerPage = 10;

const Users = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, data } = useQuery("users", getUsers, {
    onSuccess: (data) => {
      if (data?.data?.status) {
        setFitlerdData(data?.data?.data);
      } else {
        setFitlerdData([]);
      }
    },
  });
  const [filterdData, setFitlerdData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
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

  const columns = [
    {
      title: "image",
      dataIndex: "avatar.original",
      render: (url) => {
        return <img src={url} alt="test" className="w-12 h-12 rounded-full " />;
      },
    },
    {
      title: "name",
      dataIndex: "name",
    },
    {
      title: "email",
      dataIndex: "email.address",
    },
    {
      title: "mobilePhone",
      dataIndex: "phone.number",
    },

    {
      title: "validity",
      dataIndex: "account.text",
    },
    {
      title: "status",
      dataIndex: "email.is_verified",
      render: (value) => {
        return (
          <>
            {value ? (
              <span className="text-[#00AA4B]  mx-auto w-24 rounded-full py-1 px-2  flex items-center gap-x-1">
                <FaRegCircleDot className="text-[#00AA4B]" />
                {t("active")}
              </span>
            ) : (
              <span className="text-[#FF697C]  mx-auto w-24 rounded-full py-1 px-2 flex items-center gap-x-1 ">
                <FaRegCircleDot className="text-[#FF697C]" />
                {t("not active")}
              </span>
            )}
          </>
        );
      },
    },
    {
      title: "properties",
      dataIndex: "account.type",
      render: (value, row) => {
        return (
          <TableProperties
            hasEdit={true}
            hasView={true}
            hasDelete={value === "super_admin" ? false : true}
            viewAction={() => navigate(`/dashboard/user-details/${row.id}`)}
            editAction={() => navigate(`/dashboard/edit-user/${row.id}`)}
          />
        );
      },
    },
  ];
  const handleAddUser = () => navigate("/dashboard/add-user");
  console.log("data from users", data?.data?.data);
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-8 mt-6">
          <div className="w-full mb-8 flex items-center justify-between gap-5">
            <div className="w-1/2 flex-1">
              <SearchInput onSearchChange={setSearch} />
            </div>

            <div className="w-full md:w-[180px]">
              <MainBtn text="add user" action={handleAddUser} />
            </div>
          </div>
          <Table
            columns={columns}
            bodyData={filterdData.slice(offset, offset + itemsPerPage) || []}
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

export default Users;
