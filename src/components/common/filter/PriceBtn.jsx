import React, { useState, useRef } from "react";
import { TbMenuOrder } from "react-icons/tb";
import { useTranslation } from "react-i18next";
import useClickOutside from "../../../hooks/useClickOutside";
import { useDispatch } from "react-redux";
import {
  changePriceCreateHigh,
  changePriceCreateLow,
} from "../../../store/filterSlice";
const PriceBtn = () => {
  const { t, i18n } = useTranslation();
  const [show, setShow] = useState(false);
  const ref = useRef();
  const dispatch = useDispatch();
  useClickOutside(ref, () => setShow(false));
  return (
    <div
      ref={ref}
      onClick={() => setShow(!show)}
      className="relative cursor-pointer"
    >
      <button className=" flex items-center justify-center gap-2 rounded-xl p-3 w-[150px] bg-white border border-slate-300">
        <p>{t("price")}</p>
        <TbMenuOrder size={15} />
      </button>
      <div
        className={`absolute bottom-[-80px] ${
          i18n.language === "ar" ? "right-0" : "left-0"
        } text-start bg-white z-40 shadow-lg rounded-md p-3 ${
          show ? "block" : "hidden"
        }`}
      >
        <p
          onClick={() => {
            dispatch(changePriceCreateHigh());
            setShow(false);
          }}
          className="mb-3 cursor-pointer"
        >
          {t("highPrice")}
        </p>
        <p
          onClick={() => dispatch(changePriceCreateLow())}
          className=" cursor-pointer"
        >
          {t("lowPrice")}
        </p>
      </div>
    </div>
  );
};

export default PriceBtn;
