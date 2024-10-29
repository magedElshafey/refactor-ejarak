import React from "react";
import { useTranslation } from "react-i18next";

const ReservationData = ({ data, downloadContract }) => {
  const { t, i18n } = useTranslation();
  const contractBeginning = new Date(Date.parse(data?.contract_start_date));
  const endDate = new Date(contractBeginning);
  endDate.setMonth(contractBeginning.getMonth() + data?.contract_period);
  return (
    <div className="py-3 px-5 rounded-2xl border border-slate-300 my-5">
      <p className={`text-lg mb-5 bg-slate-200 p-2 rounded-md `}>
        {downloadContract ? "2)" : null} {t("reservationDetails")}
      </p>
      <div
        className={`w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ${
          data?.family_number ? "xl:grid-cols-6" : "xl:grid-cols-5"
        } gap-3 md:gap-6 lg:gap-8 p-3`}
      >
        <div>
          <p className="text-[#4D5F65] mb-1">{t("reservationBeginsAt")}</p>
          <p className="text-black">
            {contractBeginning.toLocaleDateString("en-GB")}
          </p>
        </div>
        <div>
          <p className="text-[#4D5F65] mb-1">{t("reservationEndsAt")}</p>
          <p className="text-black">{endDate.toLocaleDateString("en-GB")}</p>
        </div>
        <div>
          <p className="text-[#4D5F65] mb-1">{t("reservationPeriod")}</p>
          <p className="text-black">
            {data?.contract_period} {t("months")}
          </p>
        </div>
        {data?.family_number ? (
          <div>
            <p className="text-[#4D5F65] mb-1">{t("familyNum")}</p>
            <p className="text-black">{data?.family_number}</p>
          </div>
        ) : null}
        <div>
          <p className="text-[#4D5F65] mb-1">{t("adminn")}</p>
          <p className="text-black">
            {data.contract_fee_payer === "owner" && i18n.language === "ar"
              ? "المالك"
              : data.contract_fee_payer === "owner" && i18n.language === "en"
              ? "owner"
              : data.contract_fee_payer === "tenant" && i18n.language === "ar"
              ? "المستأجر"
              : "tenant"}
          </p>
        </div>
        <div>
          <p className="text-[#4D5F65] mb-1">{t("status")}</p>
          <p className="text-black">{t(data?.status)}</p>
        </div>
      </div>
    </div>
  );
};

export default ReservationData;
