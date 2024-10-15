import React from "react";
import { numbersWithZero } from "../../../data/data";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { changeParkingNumbers } from "../../../store/filterSlice";
const ParkingNumbers = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { parkingNumbers } = useSelector((state) => state.filterSlice);
  return (
    <div className="mb-4">
      <p className="text-[#78797A] font-medium mb-3 text-base md:text-md lg:text-lg">
        {t("parkingNumbers")}
      </p>
      <div className="flex gap-2 flex-wrap">
        {numbersWithZero?.map((item, index) => (
          <div
            onClick={() => dispatch(changeParkingNumbers(item.number))}
            key={index}
            className={` duration-300 px-4 py-2 flex items-center justify-center rounded-md cursor-pointer ${
              item.number === parkingNumbers
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

export default ParkingNumbers;
