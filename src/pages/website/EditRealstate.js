import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Swal from "sweetalert2";
import MainBtn from "../../components/common/buttons/MainBtn";
import LoadingBtn from "../../components/common/buttons/LoadingBtn";
import MainSelect from "../../components/common/inputs/MainSelect";
import MainInput from "../../components/common/inputs/MainInput";
import RealstateImages from "../../components/editRealstate/RealstateImages";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { getRealStateDetails } from "../../services/get/getRealStateDetails";
import Spinner from "../../components/common/Spinner";
const EditRealstate = () => {
  const params = useParams();
  const { t, i18n } = useTranslation();
  const { isLoading, data } = useQuery(["realstate-details", params.id], () =>
    getRealStateDetails(params.id)
  );
  console.log("data", data?.data?.data);
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-8 mt-4">
          <form className="w-full bg-white rounded-md p-6 shadow-xl ">
            <div className="flex items-center mb-2 gap-1">
              <IoIosCheckmarkCircle size={20} className="text-maincolorgreen" />
              <p className="text-textColor">{t("realstate details")}</p>
            </div>
            <RealstateImages data={data?.data?.data?.images} />
          </form>
        </div>
      )}
    </>
  );
};

export default EditRealstate;
