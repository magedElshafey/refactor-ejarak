import React from "react";
import { numbersWithZero } from "../../../data/data";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { changeAirConditions } from "../../../store/filterSlice";
const AirConditions = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { airConditions } = useSelector((state) => state.filterSlice);
  return (
    <div className="mb-4">
      <p className="text-[#78797A] font-medium mb-3 text-base md:text-md lg:text-lg">
        {t("airConditions")}
      </p>
      <div className="flex gap-2 flex-wrap">
        {numbersWithZero?.map((item, index) => (
          <div
            onClick={() => dispatch(changeAirConditions(item.number))}
            key={index}
            className={` duration-300 px-4 py-2 flex items-center justify-center rounded-md cursor-pointer ${
              item.number === airConditions
                ? "bg-maincolorgreen text-white"
                : "bg-grayColor"
            }`}
          >
            {item.number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AirConditions;
