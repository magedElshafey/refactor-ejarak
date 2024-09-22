import React from "react";
import { useTranslation } from "react-i18next";
import { FaRegCircle } from "react-icons/fa";
const StatisticsChart = ({ totalCities, data }) => {
  const { t } = useTranslation();
  return (
    <div className="border border-[#7A8499] p-2 px-8 rounded-xl h-auto lg:h-[310px] overflow-auto">
      <p className="p-3 font-bold">{t("number of real estate in cities")}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 mb-3  lg:gap-16">
        <div className="">
          {totalCities
            ?.slice(0, Math.ceil(totalCities?.length / 2))
            .map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between mb-5"
              >
                <div className="flex items-center align-center  text-nowrap  gap-1">
                  <FaRegCircle size={12} className="text-[#7A8499] " />
                  <p>{data?.cities?.number_of_realestate_in_city[item]}</p>
                </div>
                <div className="">{item}</div>
              </div>
            ))}
        </div>
        <div>
          {totalCities
            .slice(Math.ceil(totalCities.length / 2))
            .map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between mb-5"
              >
                <div className="flex items-center align-center  text-nowrap  gap-1">
                  <FaRegCircle size={15} className="text-[#7A8499] " />
                  <p>{data?.cities?.number_of_realestate_in_city[item]}</p>
                </div>
                <div className="">{item}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default StatisticsChart;
