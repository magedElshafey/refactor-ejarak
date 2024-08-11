import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../components/common/Spinner";
import MainInput from "../../../components/common/inputs/MainInput";
import useUserDetails from "../../../hooks/api/useUserDetails";
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div>
              <img
                src={data?.data?.data.avatar?.original}
                alt={data?.name}
                className=" w-full md:w-[300px] object-contain rounded-lg"
              />
            </div>
            <div>
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
                <div className="my-6">
                  <MainInput
                    disabled
                    value={data?.data?.data?.phone.number}
                    label="mobilePhone"
                  />
                </div>
              </div>
              <MainInput
                disabled
                value={data?.data?.data?.account?.text}
                label="access"
              />
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
