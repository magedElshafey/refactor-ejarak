import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../components/common/Spinner";
import MainInput from "../../../components/common/inputs/MainInput";
import useUserDetails from "../../../hooks/api/useUserDetails";
import { FaRegCircleDot } from "react-icons/fa6";
import ksa from "../../../assets/ksa.jpg";
const UserDetails = () => {
  const { t } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();
  const { isLoading, data } = useUserDetails(params.id);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-8 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 items-center">
            <div className="w-full border border-dashed border-[#9399A3] p-5 rounded-lg flex items-center justify-center">
              <img
                src={data?.data?.data.avatar?.original}
                alt={data?.name}
                className=" w-full md:w-[300px] object-contain rounded-lg"
              />
            </div>
            <div className="bg-[#f7f7f7] rounded-lg p-4">
              <MainInput disabled value={data?.data?.data?.name} label="name" />
              <div className="my-6">
                <MainInput
                  disabled
                  value={data?.data?.data?.email?.address}
                  label="email"
                />
              </div>
              <div className="my-6">
                <MainInput
                  disabled
                  value={data?.data?.data?.nationalId}
                  label="nationalId"
                />
                <div className="my-6 flex items-center gap-3">
                  <MainInput
                    disabled
                    value={data?.data?.data?.phone.number}
                    label="mobilePhone"
                  />
                  <div className="p-2 w-[50px] border border-[#9399A3] rounded-xl flex items-center justify-center h-[50px] mt-[25px] bg-white">
                    <img alt="ksa-flag" src={ksa} className="w-[24px] " />
                  </div>
                </div>
              </div>
              <div className="my-6">
                <MainInput
                  disabled
                  value={data?.data?.data?.account?.text}
                  label="access"
                />
              </div>
              {data?.data?.data?.email?.is_verified ? (
                <div className="text-[#00AA4B]  mx-auto w-24 rounded-full py-1 px-2  flex items-center gap-x-1">
                  <FaRegCircleDot className="text-[#00AA4B]" />
                  {t("active")}
                </div>
              ) : (
                <div className="text-[#FF697C]  mx-auto w-24 rounded-full py-1 px-2 flex items-center gap-x-1 ">
                  <FaRegCircleDot className="text-[#FF697C]" />
                  {t("not active")}
                </div>
              )}
            </div>
          </div>
          <div className="mt-8 flex items-center justify-end">
            <button
              type="button"
              className="font-semibold"
              onClick={() => navigate(-1)}
            >
              {t("back")}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UserDetails;
