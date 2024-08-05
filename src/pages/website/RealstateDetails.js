import React from "react";
import { useQuery } from "react-query";
import Spinner from "../../components/common/Spinner";
import { getRealStateDetails } from "../../services/get/getRealStateDetails";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import RealstateAssets from "../../components/realstate/RealstateAssets";
import RealstateInfo from "../../components/realstate/RealstateInfo";
import Meta from "../../components/common/meta/Meta";
import RealstateData from "../../components/realstate/RealstateData";
import RealstateLocation from "../../components/realstate/RealstateLocation";
import RealstateOwnerCard from "../../components/realstate/RealstateOwnerCard";
import { useSelector } from "react-redux";
const RealstateDetails = () => {
  const params = useParams();
  const { userData } = useSelector((state) => state.authSlice);
  const userId = userData?.id;
  const { t } = useTranslation();
  const { isLoading, data } = useQuery(["realstate-details", params.id], () =>
    getRealStateDetails(params.id)
  );
  console.log("from realstate", data?.data?.data);
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-8 mt-8">
          <Meta title={data?.data?.data?.name} />
          <RealstateInfo name={data?.data?.data?.name} />
          <RealstateAssets
            images={data?.data?.data?.images}
            video={data?.data?.data?.video}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 my-8">
            <RealstateData data={data?.data?.data} />
            <RealstateLocation data={data?.data?.data} />
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 my-8">
            <div className="bg-white p-4 rounded-lg shadow-lg flex-1">
              <p className="mb-3 font-extrabold">{t("notes")}</p>
              <p className="text-textColor">{data?.data?.data?.notes}</p>
            </div>
            <div className="bg-white p-7 rounded-lg shadow-lg  border-2 border-maincolorgreen w-full md:w-[350px] ">
              <p className="text-md md:text-lg lg:text-xl font-semibold text-textColor mb-2">
                {t("price")}
              </p>
              <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl  font-extrabold  text-maincolorgreen mb-2">
                {data?.data?.data?.price} {t("currency")}
              </p>
            </div>
          </div>
          {data?.data?.data?.user?.id !== userId ? (
            <div className="my-8">
              <RealstateOwnerCard
                name={data?.data?.data?.user?.name}
                img={data?.data?.data?.user?.avatar?.original}
                phone={`tel:${data?.data?.data?.user?.phone?.country_code}${data?.data?.data?.user?.phone?.number}`}
                whatsapp={`https://wa.me/${data?.data?.data?.user?.phone?.country_code}${data?.data?.data?.user?.phone?.number}`}
                id={data?.data?.data?.user?.id}
              />
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default RealstateDetails;
