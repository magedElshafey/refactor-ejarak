import React from "react";
import { useTranslation } from "react-i18next";
import { FaRegCircle } from "react-icons/fa";
const StatisticsChart = ({ totalCities, data }) => {
  const { t } = useTranslation();
  return (
    <div className="border border-[#7A8499] p-2 rounded-xl h-auto lg:h-[330px] overflow-auto">
      <p className="p-3 font-bold">{t("number of real estate in cities")}</p>
      <div className="flex ">
        <div className="grid grid-cols-2 lg lg:grid-cols-4 gap-5 ">
          {totalCities
            ?.slice(0, Math.ceil(totalCities?.length / 2))
            .map((item, index) => (
              <div key={index}>
                <div className="">
                  <div className="flex items-center align-center  text-nowrap flex-1 gap-1">
                    <FaRegCircle size={12} className="text-[#7A8499] " />
                    <p>{item}</p>
                  </div>
                  <div className="">
                    {data?.cities?.number_of_realestate_in_city[item]}
                  </div>
                </div>
              </div>
            ))}
          {totalCities
            .slice(Math.ceil(totalCities.length / 2))
            .map((item, index) => (
              <div key={index}>
                <div className="">
                  <div className="flex items-center align-center  text-nowrap flex-1 gap-1">
                    <FaRegCircle size={12} className="text-[#7A8499] " />
                    <p>{item}</p>
                  </div>
                  <div className="">
                    {data?.cities?.number_of_realestate_in_city[item]}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default StatisticsChart;
