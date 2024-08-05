import React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import RealstateOwnerCard from "../../components/realstate/RealstateOwnerCard";
import { useQuery } from "react-query";
import Spinner from "../../components/common/Spinner";
import { getRealstateOwner } from "../../services/get/getRealstateOwner";
import RealStateCard from "../../components/common/RealstateCard";
const RealstateOwnerDetails = () => {
  const params = useParams();
  const { t } = useTranslation();
  const { isLoading, data } = useQuery(["realstate-owner", params.id], () =>
    getRealstateOwner(params.id)
  );
  console.log("data from realstate owner", data?.data);
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-8 mt-4">
          <RealstateOwnerCard
            name={data?.data?.data[0]?.user?.name}
            img={data?.data?.data[0]?.user?.avatar?.original}
            phone={`tel:${data?.data?.data[0]?.user?.phone?.country_code}${data?.data?.data[0]?.user?.phone?.number}`}
            whatsapp={`https://wa.me/${data?.data?.data[0]?.user?.phone?.country_code}${data?.data?.data[0]?.user?.phone?.number}`}
            id={params.id}
          />
          {data?.data?.data?.length ? (
            <div className="my-7">
              <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-extrabold text-textColor mb-4">
                {t("owner")}
              </p>
              {data?.data?.data?.map((item, index) => (
                <RealStateCard key={index} data={item} />
              ))}
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default RealstateOwnerDetails;
