import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import style from "./are.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeArea } from "../../../store/filterSlice";
const Area = ({ min, max }) => {
  const { area } = useSelector((state) => state.filterSlice);
  const [areaVal, setareaVal] = useState(area || min);
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const maxValRef = useRef(max);
  const range = useRef(null);
  useEffect(() => {
    setareaVal(area || min);
  }, [area, min]);
  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );
  useEffect(() => {
    const maxPercent = getPercent(areaVal);

    if (range.current) {
      range.current.style.width = `${maxPercent}%`;
    }
  }, [areaVal, getPercent]);
  return (
    <div className="mb-4">
      <h1 className="text-lg text-start  text-black font-semibold my-2">
        {t("allArea")}
      </h1>
      <>
        <div className={style.container}>
          <input
            type="range"
            min={min}
            max={max}
            value={areaVal}
            onMouseUp={(e) => {
              dispatch(changeArea(Number(e.target.value)));
            }}
            onChange={(event) => {
              setareaVal(Number(event.target.value));
            }}
            className={`${style.thumb} ${style.thumbRight}`}
          />

          <div className={style.slider}>
            <div className={style.slider__track} />
            <div ref={range} className={style.slider__range} />
          </div>
        </div>
        <div className="flex gap-1 justify-end text-[#78797A] mt-2">
          <h1 className="text-[14px] text-[#3F4240] font-bold">{areaVal}</h1>
          <span>{t("meterSquare")}</span>
        </div>
      </>
    </div>
  );
};

export default Area;
