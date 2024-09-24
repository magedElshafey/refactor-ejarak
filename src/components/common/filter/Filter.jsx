import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import RealStateCategories from "./RealStateCategories";
import Price from "./Price";
import Rooms from "./Rooms";
import Bathrooms from "./Bathrooms";
import Area from "./Area";
import ResetBtn from "./ResetBtn";
import { useDispatch } from "react-redux";
import { closeFilter, changeDistance } from "../../../store/filterSlice";
import { IoClose } from "react-icons/io5";
import SearchBtn from "./SearchBtn";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const Filter = ({ bg, rounded, showRealStateBtn, mobileVieow }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { location, distance } = useSelector((state) => state.filterSlice);
  const [dist, setDist] = useState(distance || ""); // اجعل الحالة تعتمد على Redux
  const debounceRef = useRef();
  useEffect(() => {
    setDist(distance); // تحديث حالة dist عند تغيير distance في Redux
  }, [distance]);
  useEffect(() => {
    if (dist === "") return; // تأكد من عدم إرسال طلب عند الحقل الفارغ

    // تنظيف الـ timeout السابق إذا كان موجودًا
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // تعيين الـ timeout لإرسال الـ request بعد 1 ثانية
    debounceRef.current = setTimeout(() => {
      dispatch(changeDistance(dist));
    }, 500);

    // تنظيف الـ timeout عند unmounting أو تغيير dist
    return () => {
      clearTimeout(debounceRef.current);
    };
  }, [dist, dispatch]);
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
            {location ? <p> {t("location")} : </p> : null}

            <p className="font-bold">{location}</p>
          </div>
          {location ? (
            <Link
              to="/"
              className=" underline text-blue-500 block w-fit text-center "
            >
              {t("change location")}
            </Link>
          ) : null}
        </div>
      ) : null}
      {pathname === "/website/near-realstates" || pathname === "/" ? (
        <div className="my-5">
          <label
            htmlFor="dist"
            className="text-lg text-start text-black font-semibold mb-2"
          >
            {t("dist")} ({t("km")})
          </label>
          <input
            type="number"
            id="dist"
            className="w-full border p-2 rounded-md bg-transparent focus:outline-none"
            value={dist}
            onChange={(e) => setDist(e.target.value)}
          />
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
