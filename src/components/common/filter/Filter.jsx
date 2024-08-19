import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import RealStateCategories from "./RealStateCategories";
import Price from "./Price";
import Rooms from "./Rooms";
import Bathrooms from "./Bathrooms";
import Area from "./Area";
import ResetBtn from "./ResetBtn";
import { useDispatch } from "react-redux";
import { closeFilter } from "../../../store/filterSlice";
import { IoClose } from "react-icons/io5";
import SearchBtn from "./SearchBtn";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Filter = ({ bg, rounded, showRealStateBtn, mobileVieow }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { location } = useSelector((state) => state.filterSlice);
  return (
    <div
      className={`${bg} w-full ${rounded} p-4 px-6 min-h-full ${
        mobileVieow ? "" : "shadow-lg"
      }`}
    >
      {mobileVieow ? (
        <IoClose
          size={20}
          className=" cursor-pointer mb-5"
          onClick={() => dispatch(closeFilter())}
        />
      ) : null}
      {showRealStateBtn ? (
        <Link
          to="/website/near-realstates"
          className="w-full mb-5 bg-maincolorgreen text-white p-3 rounded-md font-bold flex items-center justify-center"
        >
          {t("display list of real states")}
        </Link>
      ) : null}
      {pathname === "/website/near-realstates" ? (
        <div className="flex  gap-1 flex-col items-center">
          <div className="flex  gap-1">
            <p> {t("location")} : </p>
            <p className="font-bold">{location}</p>
          </div>
          <Link
            to="/"
            className=" underline text-blue-500 block w-fit text-center "
          >
            {t("change location")}
          </Link>
        </div>
      ) : null}
      <RealStateCategories />
      <Price min={1000} max={50000} />
      <Rooms />
      <Bathrooms />
      <Area min={1} max={1000} />
      <div className="flex items-center justify-between">
        {mobileVieow ? <SearchBtn /> : null}
        <ResetBtn />
      </div>
    </div>
  );
};

export default Filter;
