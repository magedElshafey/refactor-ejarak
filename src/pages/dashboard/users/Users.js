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
import { deleteUser } from "../../../services/delete/dashboard/deleteUser";
import useAccountType from "../../../hooks/api/useAccountType";
import { MdFilterAlt } from "react-icons/md";
import MainSelect from "../../../components/common/inputs/MainSelect";
import { IoMdClose } from "react-icons/io";
import { request } from "../../../services/axios";

const itemsPerPage = 10;

const Users = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showFilter, setShowFilter] = useState(false);
  const handleShowFilter = () => setShowFilter(!showFilter);
  const { loadingAccountType, accountType, error } = useAccountType();
  const [userType, setUserType] = useState("");
  const handleUserTypeChange = (e) => setUserType(e.id);
  const { isLoading, data } = useQuery(
    ["users", userType],
    () => getUsers(userType),
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
  const { isLoading: loadingDelete, mutate } = useMutation(
    (i, v) => deleteUser(i, v),
    {
      onSuccess: (data) => {
        if (data?.data?.status) {
          Swal.fire({
            icon: "success",
            title: data?.data?.message,
          });
          queryClient.invalidateQueries("users");
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
      text: t("do you sure you want to remove the user"),
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
  const handleuserActivation = async (id, data) => {
    return await request({
      url: `/Dashboard/users/active-user/${id}`,
      method: "PATCH",
      data,
    });
  };

  const { isLoading: specialLoading, mutate: specialRealStateMutate } =
    useMutation(({ id, data }) => handleuserActivation(id, data), {
      onSuccess: (data) => {
        console.log("data from success", data);
        if (data?.data?.status) {
          Swal.fire({
            icon: "success",
            title: data?.data?.message,
          });
          queryClient.invalidateQueries("users");
        } else {
          Swal.fire({
            icon: "error",
            title: data?.response?.data?.message,
          });
        }
      },
    });

  const handleSpecialRealState = (v, id) => {
    const data = {
      active: v ? 2 : 1,
    };
    specialRealStateMutate({ id, data });
  };
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
      render: (value) => <p className=" lowercase">{value}</p>,
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
      dataIndex: "phone.is_verified",
      render: (value, row) => {
        console.log("value", value);
        console.log("row", row);
        return (
          <label className="inline-flex items-center me-5 cursor-pointer">
            <>
              <input
                type="checkbox"
                value=""
                checked={value}
                className="sr-only peer"
                onChange={() => handleSpecialRealState(value, row.id)}
                disabled={specialLoading}
              />
              <div
                className={`relative w-11 h-6 bg-gray-200 rounded-full dark:bg-gray-700 peer-checked:after:translate-x-[${
                  value ? "-100%" : "0"
                }] rtl:peer-checked:after:-translate-x-0 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600`}
              ></div>
              <p className="mx-2">{value ? t("active") : t("inactive")}</p>
            </>
          </label>
        );
      },
    },
    {
      title: "properties",
      dataIndex: "account.type",
      render: (value, row) => {
        return (
          <TableProperties
            hasEdit={false}
            hasView={true}
            hasDelete={value === "super_admin" ? false : true}
            viewAction={() => navigate(`/dashboard/user-details/${row.id}`)}
            deleteAction={() => handleDelete(row.id)}
            disabled={loadingDelete}
          />
        );
      },
    },
  ];
  const handleAddUser = () => navigate("/dashboard/add-user");
  const newAccountType = {
    name: t("all"), // Assuming `t` is your translation function
    id: "",
  };
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-8 mt-6">
          <div className="w-full mb-8 flex items-center justify-between gap-5 flex-wrap">
            <div className="w-full md:w-1/2 flex-1">
              <SearchInput onSearchChange={setSearch} />
            </div>

            <div className="flex items-center gap-3 flex-col lg:flex-row">
              <button
                onClick={handleShowFilter}
                className="flex items-center justify-center gap-3 p-3 bg-white text-maincolorgreen font-semibold border border-slate-400 rounded-lg min-w-[140px]"
              >
                <p>{t("filter")}</p>
                <MdFilterAlt size={20} />
              </button>
              <div className="w-full md:w-[180px]">
                <MainBtn text="add user" action={handleAddUser} />
              </div>
            </div>
          </div>
          <div
            className={`w-full relative p-3 flex items-center gap-3 rounded-lg bg-white shadow-sm my-8 duration-300 border border-slate-500 ${
              showFilter ? "block opacity-100" : "hidden opacity-0"
            }`}
          >
            <div className="w-[180px]">
              <MainSelect
                label="userType"
                options={[
                  newAccountType,
                  ...accountType?.data?.data?.account_type,
                ]}
                onSelect={handleUserTypeChange}
                loading={loadingAccountType}
                value={
                  userType === ""
                    ? t("all")
                    : accountType?.data?.data?.account_type?.find(
                        (item) => item?.id === userType
                      )?.name
                }
              />
            </div>
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

export default Users;
