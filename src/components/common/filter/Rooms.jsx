import React from "react";
import { numbers } from "../../../data/data";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { changeRoomNumbers } from "../../../store/filterSlice";
const Rooms = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { roomNumbers } = useSelector((state) => state.filterSlice);
  return (
    <div className="mb-4">
      <p className="text-[#78797A] font-medium mb-3 text-base md:text-md lg:text-lg">
        {t("rooms")}
      </p>
      <div className="flex gap-2 flex-wrap">
        {numbers?.map((item, index) => (
          <div
            onClick={() => dispatch(changeRoomNumbers(item.number))}
            key={index}
            className={` duration-300 px-5 py-2 flex items-center justify-center rounded-md cursor-pointer ${
              item.number === roomNumbers
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

export default Rooms;
