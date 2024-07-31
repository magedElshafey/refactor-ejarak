import React from "react";
import { useTranslation } from "react-i18next";
const OwnerData = ({ data, downloadContract }) => {
  const { t } = useTranslation();
  return (
    <div className="py-3 px-5 rounded-2xl border border-slate-300 my-5">
      <p
        className={`text-lg mb-5 ${
          downloadContract
            ? "bg-maincolorgreen text-white p-2 rounded-md"
            : null
        }`}
      >
        {downloadContract ? "3)" : null} {t("lessor data")}
      </p>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8 p-3 bg-slate-200 rounded-md">
        <div>
          <p className="text-[#4D5F65] mb-1">{t("name")}</p>
          <p className="text-black">{data?.name}</p>
        </div>
        <div>
          <p className="text-[#4D5F65] mb-1">{t("id")}</p>
          <p className="text-black">{data?.nationalId}</p>
        </div>
        <div>
          <p className="text-[#4D5F65] mb-1">{t("mobilePhone")}</p>
          <p className="text-black">{data?.phone?.number}</p>
        </div>
        <div>
          <p className="text-[#4D5F65] mb-1">{t("mobilePhone")}</p>
          <p className="text-black lowercase">{data?.email?.address}</p>
        </div>
      </div>
    </div>
  );
};

export default OwnerData;
