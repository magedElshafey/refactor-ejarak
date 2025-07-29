import React from "react";
import { useTranslation } from "react-i18next";
import { formatDateTime } from "../../utils/formateDateTime";
import { useSelector } from "react-redux";
const RealstateData = ({ data }) => {
  const { t, i18n } = useTranslation();
  const currentYear = new Date().getFullYear();
  const { userData } = useSelector((state) => state.authSlice);
  const role = userData?.account?.type;
  return (
    <div className="bg-white p-7 rounded-lg shadow-lg">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div>
          <p className="text-[#4D5F65] mb-1">{t("houseType")}</p>
          <p className="text-black font-bold">{data?.category?.name}</p>
        </div>
        <div>
          <p className="text-[#4D5F65] mb-1">{t("unit")}</p>
          <p className="text-black font-bold">{data?.sub_category?.name}</p>
        </div>
        <div>
          <p className="text-[#4D5F65] mb-1">{t("years")}</p>
          <p className="text-black font-bold">
            {+currentYear - parseInt(data?.year_of_construction)}
          </p>
        </div>
        <div>
          <p className="text-[#4D5F65] mb-1 ">{t("city")}</p>
          <p className="text-black font-bold">{data?.city?.name}</p>
        </div>
        <div>
          <p className="text-[#4D5F65] mb-1">{t("region")}</p>
          <p className="text-black font-bold">{data?.region}</p>
        </div>
        <div>
          <p className="text-[#4D5F65] mb-1">{t("district")}</p>
          <p className="text-black font-bold">{data?.address}</p>
        </div>
        <div>
          <p className="text-[#4D5F65] mb-1">{t("space")}</p>
          <p className="text-black font-bold">
            {data?.area} {t("meterSquare")}
          </p>
        </div>
        <div>
          <p className="text-[#4D5F65] mb-1">{t("elevators")}</p>
          <p className="text-black font-bold">
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
          <p className="text-[#4D5F65] mb-1">{t("turn")}</p>
          <p className="text-black font-bold">{data?.floor_number}</p>
        </div>
        <div>
          <p className="text-[#4D5F65] mb-1">{t("roomNum")}</p>
          <p className="text-black font-bold">{data.rooms_count}</p>
        </div>
        <div>
          <p className="text-[#4D5F65] mb-1">{t("Number of Bathrooms")}</p>
          <p className="text-black font-bold">{data?.bathrooms_count}</p>
        </div>
        <div>
          <p className="text-[#4D5F65] mb-1">{t("Furnished")}</p>
          <p className="text-black font-bold">
            {+data?.furniture === 0 && i18n.language === "ar"
              ? "لا"
              : +data.furniture === 0 && i18n.language === "en"
              ? "NO"
              : data.furniture !== 0 && i18n.language === "ar"
              ? "نعم"
              : "Yes"}
          </p>
        </div>
        <div>
          <p className="text-[#4D5F65] mb-1">{t("kitchen")}</p>
          <p className="text-black font-bold">
            {+data?.kitchen === 0 && i18n.language === "ar"
              ? "لا"
              : +data.kitchen === 0 && i18n.language === "en"
              ? "NO"
              : data.kitchen !== 0 && i18n.language === "ar"
              ? "نعم"
              : "Yes"}
          </p>
        </div>
        {/* <div>
          <p className="text-[#4D5F65] mb-1">{t("airConditions")}</p>
          <p className="text-black font-bold">{data?.air_conditioner}</p>
        </div> */}
        {/* <div>
          <p className="text-[#4D5F65] mb-1">{t("parkingNumbers")}</p>
          <p className="text-black font-bold">{data?.barking_space}</p>
        </div> */}
        {/* {data?.barking_space ? (
          <div>
            <p className="text-[#4D5F65] mb-1">{t("parkingType")}</p>
            <p className="text-black font-bold">
              {data?.barking === 0 && i18n.language === "ar"
                ? "بدروم"
                : data?.barking === 0 && i18n.language === "en"
                ? "basement"
                : data.barking !== 0 && i18n.language === "ar"
                ? "أمامي"
                : "front"}
            </p>
          </div>
        ) : null} */}
        <div>
          <p className="text-[#4D5F65] mb-1">{t("Number of service rooms")}</p>
          <p className="text-black font-bold">{data.service_room}</p>
        </div>
        <div>
          <p className="text-[#4D5F65] mb-1">{t("payment method")}</p>
          <p className="text-black font-bold">{data.payment_type_id?.name}</p>
        </div>
        {role === "admin" || role === "super_admin" ? (
          <div>
            <p className="text-[#4D5F65] mb-1">{t("suckNum")}</p>
            <p className="text-black font-bold">{data?.instrument_number}</p>
          </div>
        ) : null}

        <div>
          <p className="text-[#4D5F65] mb-1">{t("advertisement number")}</p>
          <p className="text-black font-bold">{data?.number_ad}</p>
        </div>
        <div>
          <p className="text-[#4D5F65] mb-1">{t("Advertisement date")}</p>
          <p className="text-black font-bold">
            {formatDateTime(data?.created_at)}
          </p>
        </div>
        <div>
          <p className="text-[#4D5F65] mb-1">{t("ViewsNum")}</p>
          <p className="text-black font-bold">{data?.views_count}</p>
        </div>
      </div>
    </div>
  );
};

export default RealstateData;
