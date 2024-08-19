import React, { useState, useRef } from "react";
import { useGlobalContext } from "../../../hooks/GlobalContext";
import { useDispatch, useSelector } from "react-redux";
import { changeCityId } from "../../../store/filterSlice";
import useClickOutside from "../../../hooks/useClickOutside";
import { useTranslation } from "react-i18next";
import { MdKeyboardArrowDown } from "react-icons/md";

const CityBtn = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { data } = useGlobalContext();
  const { cityId } = useSelector((state) => state.filterSlice);
  const [show, setShow] = useState(false);
  const ref = useRef();
  useClickOutside(ref, () => setShow(false));
  return (
    <div
      ref={ref}
      onClick={() => setShow(!show)}
      className="relative cursor-pointer"
    >
      <button className=" flex items-center justify-center gap-2 rounded-xl p-3 w-[180px] bg-white border border-slate-300">
        {cityId
          ? data?.cities?.find((item) => item.id === cityId).name
          : t("city")}

        <MdKeyboardArrowDown size={15} />
      </button>
      <div
        className={`absolute  top-[45px] w-full ${
          i18n.language === "ar" ? "right-0" : "left-0"
        } text-start bg-white z-40 shadow-lg rounded-md p-3 ${
          show ? "block" : "hidden"
        }`}
      >
        {data?.cities?.map((item, index) => (
          <p
            key={index}
            className="mb-2 cursor-pointer"
            onClick={() => {
              dispatch(changeCityId(item.id));
              setShow(false);
            }}
          >
            {item.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CityBtn;
