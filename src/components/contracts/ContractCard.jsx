import React from "react";
import { useTranslation } from "react-i18next";
import { formatDateTime } from "../../utils/formateDateTime";
import { Link } from "react-router-dom";

import UserContactCard from "../common/user/UserContactCard";
import ContractDetailsBtn from "./ContractDetailsBtn";
const ContractCard = ({
  title,
  realstateId,
  data,
  index,
  role,

  contractDate,
  dep,
  type,
  contractId,
}) => {
  const { t, i18n } = useTranslation();
  console.log("data returned from contract card", data);
  return (
    <div className="w-full flex gap-3 mb-5">
      <div className="p-3 rounded-md flex items-center  w-8 bg-[#f5f5fa]">
        {++index}
      </div>
      <div className="flex-1 border border-[#e7e9ed] rounded-xl">
        <div className="w-full flex justify-end">
          <div className="p-3 rounded-xl bg-[#e8e8e8] flex items-center justify-center">
            <p>{formatDateTime(contractDate)}</p>
          </div>
        </div>
        <div className="px-6">
          <Link
            to={`/website/realstate/${realstateId}`}
            className="block font-bold lg:text-lg mb-4 md:w-[80%] text-maincolorgreen underline"
          >
            {title}
          </Link>
          <div className="w-full flex items-center justify-between flex-wrap gap-4 mb-5 md:mb-6 lg:mb-8">
            <div className="flex flex-col items-center">
              <p className="text-textColor mb-1">
                {role === "owner" ? t("tentName") : t("ownerName")}
              </p>
              <p className="font-bold">
                {role === "owner"
                  ? data?.tenant?.name
                  : data?.realestate?.user?.name}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-textColor mb-1">{t("adminn")}</p>
              <p className="font-bold">
                {data?.contract_fee_payer === "owner" && i18n.language === "ar"
                  ? "المالك"
                  : data?.contract_fee_payer === "owner" &&
                    i18n.language === "en"
                  ? "owner"
                  : data?.contract_fee_payer === "tenant" &&
                    i18n.language === "ar"
                  ? "المستأجر"
                  : "tenant"}
              </p>
            </div>
            {data?.family_number ? (
              <div className="flex flex-col items-center">
                <p className="text-textColor mb-1">{t("familyNum")}</p>
                <p className="font-bold">{data.family_number}</p>
              </div>
            ) : null}
            <div className="flex flex-col items-center">
              <p className="text-textColor mb-1">{t("period")}</p>
              <p className="font-bold">
                {data?.contract_period} {t("months")}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-textColor mb-1">{t("periodFrom")}</p>
              <p className="font-bold">
                {formatDateTime(data?.contract_start_date)}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between flex-col md:flex-row gap-3 md:gap-0 mb-3">
            <UserContactCard
              role={role}
              phone={
                role === "owner"
                  ? `tel:${data?.tenant?.phone?.country_code}${data?.tenant?.phone?.number}`
                  : `tel:${data?.owner?.phone?.country_code}${data?.owner?.phone?.number}`
              }
              whatsapp={
                role === "owner"
                  ? `https://wa.me/${data?.tenant?.phone?.country_code}${data?.tenant?.phone?.number}`
                  : `https://wa.me/${data?.owner?.phone?.country_code}${data?.owner?.phone?.number}`
              }
              chat={
                role === "owner"
                  ? `/website/chat/${data?.tenant?.id}`
                  : `/website/chat/${data?.owner?.id}`
              }
            />
            <div className="flex items-center gap-3 flex-wrap">
              {type === "manual" ? (
                <ContractDetailsBtn id={contractId} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractCard;
