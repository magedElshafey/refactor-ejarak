import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Spinner from "../../../components/common/Spinner";
import MainInput from "../../../components/common/inputs/MainInput";
import usePackageDetails from "../../../hooks/api/usePackageDetails";
const PackageDetails = () => {
  const { t } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();
  const handleNavigate = () => navigate(-1);
  const { isLoading, data } = usePackageDetails(params.id);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-8 mt-6">
          <p className="mb-7 text-md md:text-lg lg:text-xl xl:text-2xl font-bold text-textColor">
            {t("package details")}
          </p>
          <form className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 ">
            <MainInput
              type="text"
              disabled
              label="package name in arabic"
              value={data?.data?.data?.translations?.name?.ar}
            />
            <MainInput
              type="text"
              disabled
              label="package name in english"
              value={data?.data?.data?.translations?.name?.en}
            />
            <MainInput
              type="number"
              disabled
              label="package price"
              value={data?.data?.data?.price}
            />
            <MainInput
              type="number"
              disabled
              label="contractors count"
              value={data?.data?.data?.no_contracts}
            />
            <MainInput
              type="text"
              disabled
              label="notes in arabic"
              value={data?.data?.data?.translations?.notes?.ar}
            />
            <MainInput
              type="text"
              disabled
              label="notes in english"
              value={data?.data?.data?.translations?.notes?.en}
            />
          </form>
          <div className="w-full flex items-center justify-end mt-8">
            <button
              className="font-semibold"
              type="button"
              onClick={handleNavigate}
            >
              {t("back")}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PackageDetails;
