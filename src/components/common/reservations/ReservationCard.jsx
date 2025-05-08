import React from "react";
import { formatDateTime } from "../../../utils/formateDateTime";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import UserContactCard from "../user/UserContactCard";
import AcceptReservationBtn from "./AcceptReservationBtn";
import RefusedReservationBtn from "./RefusedReservationBtn";
import ReservationDetailsBtn from "./ReservationDetailsBtn";
import PayBtn from "./PayBtn";
import CreateContractBtn from "./CreateContractBtn";
const ReservationCard = ({ data, index, role, created_at, dep }) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="w-full flex gap-3 mb-5">
      <div className="p-3 rounded-md flex items-center  w-8 bg-[#f5f5fa]">
        {++index}
      </div>
      <div className="flex-1 border border-[#e7e9ed] rounded-md">
        <div className="w-full flex justify-end">
          <div className="p-2 rounded-xl bg-[#e8e8e8] flex items-center justify-center mb-3">
            <p>{formatDateTime(data?.created_at)}</p>
          </div>
        </div>
        <div className="px-6">
          <Link
            to={`/website/realstate/${data?.realty_id}`}
            className="block font-bold lg:text-lg mb-4 md:w-[80%] text-maincolorgreen underline"
          >
            {data?.reality}
          </Link>
          <div className="w-full flex items-center justify-between flex-wrap gap-4 mb-5 md:mb-6 lg:mb-8">
            <div className="flex flex-col items-start md:items-center">
              <p className="text-textColor mb-1">
                {role === "owner" ? t("tentName") : t("ownerName")}
              </p>
              <p className="font-bold">{data?.tenant?.name}</p>
            </div>
            <div className="flex flex-col items-start md:items-center">
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
              <div className="flex flex-col items-start md:items-center">
                <p className="text-textColor mb-1">{t("familyNum")}</p>
                <p className="font-bold">{data?.family_number}</p>
              </div>
            ) : null}
            <div className="flex flex-col items-start md:items-center">
              <p className="text-textColor mb-1">{t("period")}</p>
              <p className="font-bold">
                {data?.contract_period} {t("months")}
              </p>
            </div>
            <div className="flex flex-col items-start md:items-center">
              <p className="text-textColor mb-1">{t("periodFrom")}</p>
              <p className="font-bold">
                {formatDateTime(data?.contract_start_date)}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between flex-col md:flex-row gap-3 md:gap-0 mb-3">
            <UserContactCard
              role={role}
              phone={`tel:${data?.tenant?.phone?.country_code}${data?.tenant?.phone?.number}`}
              whatsapp={`tel:${data?.tenant?.phone?.country_code}${data?.tenant?.phone?.number}`}
              chat={`/website/chat/${data?.tenant?.id}`}
            />
            <div className="flex items-center gap-3 flex-wrap">
              {data?.status === "pending" && role === "owner" ? (
                <AcceptReservationBtn
                  data={created_at}
                  id={data?.id}
                  dep={dep}
                />
              ) : null}
              {data?.status === "pending" && role === "owner" ? (
                <RefusedReservationBtn
                  data={created_at}
                  id={data?.id}
                  dep={dep}
                />
              ) : null}
              {data?.status !== "pending" ||
              (data.status === "pending" && role === "tenant") ? (
                <ReservationDetailsBtn id={data?.id} />
              ) : null}
              {data?.status === "completed" &&
              role === data?.contract_fee_payer ? (
                <PayBtn id={data?.id} dep={dep} />
              ) : null}
              {data?.status === "completed" && role === "owner" ? (
                <CreateContractBtn id={data?.id} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;
