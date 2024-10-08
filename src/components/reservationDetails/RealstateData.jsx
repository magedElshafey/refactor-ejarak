import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
const RealstateData = ({ data, downloadContract }) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="py-3 px-5 rounded-2xl border border-slate-300">
      <p className={`text-lg mb-5 bg-slate-200 p-2 rounded-md`}>
        {downloadContract ? "1)" : null} {t("advertiseData")}
      </p>
      <Link
        to={`/website/realstate/${data?.id}`}
        className="block mb-3 text-lg md:text-xl lg:text-2xl font-bold text-maincolorgreen underline"
      >
        {data?.name}
      </Link>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8 p-3">
        <div>
          <p className="text-[#4D5F65] mb-1">{t("suckNum")}</p>
          <p className="text-black">{data?.instrument_number}</p>
        </div>
        <div>
          <p className="text-[#4D5F65] mb-1">{t("houseType")}</p>
          <p className="text-black">{data?.category?.name}</p>
        </div>
        <div>
          <p className="text-[#4D5F65] mb-1">{t("unit")}</p>
          <p className="text-black">{data?.sub_category?.name}</p>
        </div>
        <div>
          <p className="text-[#4D5F65] mb-1">{t("years")}</p>
          <p className="text-black">
            {new Date(Date.parse(data?.created_at)).getFullYear()}
          </p>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8 p-3 rounded-md">
        <div>
          <p className="text-[#4D5F65] mb-1">{t("space")}</p>
          <p className="text-black">
            {data?.area} {t("meterSquare")}
          </p>
        </div>
        <div>
          <p className="text-[#4D5F65] mb-1">{t("elevators")}</p>
          <p className="text-black">
            {data?.elevator && i18n.language === "ar"
              ? "يوجد"
              : data.elevator && i18n.language === "en"
              ? "founded"
              : !data?.elevator && i18n.language === "ar"
              ? "لا يوجد"
              : "not founded"}
          </p>
        </div>
        <div>
          <p className="text-[#4D5F65] mb-1">{t("city")}</p>
          <p className="text-black">{data?.city?.name}</p>
        </div>
        <div>
          <p className="text-[#4D5F65] mb-1">{t("region")}</p>
          <p className="text-black">{data.region}</p>
        </div>
        <div>
          <p className="text-[#4D5F65] mb-1">{t("district")}</p>
          <p className="text-black">{data.address}</p>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8 p-3  rounded-md">
        <div>
          <p className="text-[#4D5F65] mb-1">{t("turn")}</p>
          <p className="text-black">{data?.floor_number}</p>
        </div>
        <div>
          <p className="text-[#4D5F65] mb-1">{t("roomNum")}</p>
          <p className="text-black">{data.rooms_count}</p>
        </div>
        <div>
          <p className="text-[#4D5F65] mb-1">{t("Number of Bathrooms")}</p>
          <p className="text-black">{data?.bathrooms_count}</p>
        </div>
        <div>
          <p className="text-[#4D5F65] mb-1">{t("Furnished")}</p>
          <p className="text-black">
            {data?.furniture === 0 && i18n.language === "ar"
              ? "لا"
              : data.furniture === 0 && i18n.language === "en"
              ? "NO"
              : data.furniture !== 0 && i18n.language === "ar"
              ? "نعم"
              : "Yes"}
          </p>
        </div>
        <div>
          <p className="text-[#4D5F65] mb-1">{t("kitchen")}</p>
          <p className="text-black">
            {data?.kitchen === 0 && i18n.language === "ar"
              ? "لا"
              : data.kitchen === 0 && i18n.language === "en"
              ? "NO"
              : data.kitchen !== 0 && i18n.language === "ar"
              ? "نعم"
              : "Yes"}
          </p>
        </div>
        <div>
          <p className="text-[#4D5F65] mb-1">{t("airConditions")}</p>
          <p className="text-black">{data?.air_conditioner}</p>
        </div>

        <div>
          <p className="text-[#4D5F65] mb-1">{t("parkingNumbers")}</p>
          <p className="text-black">{data?.barking_space}</p>
        </div>
        {data?.barking_space ? (
          <div>
            <p className="text-[#4D5F65] mb-1">{t("parkingType")}</p>
            <p className="text-black">
              {data?.barking === 0 && i18n.language === "ar"
                ? "بدروم"
                : data?.barking === 0 && i18n.language === "en"
                ? "basement"
                : data.barking !== 0 && i18n.language === "ar"
                ? "أمامي"
                : "front"}
            </p>
          </div>
        ) : null}
        <div>
          <p className="text-[#4D5F65] mb-1">{t("Number of service rooms")}</p>
          <p className="text-black">{data.service_room}</p>
        </div>
      </div>
    </div>
  );
};

export default RealstateData;
