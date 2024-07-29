import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { changeHighPrice, changeLowPrice } from "../../../store/filterSlice";

const Price = ({ min, max }) => {
  const { highPrice, lowPrice } = useSelector((state) => state.filterSlice);
  const [minVal, setMinVal] = useState(lowPrice || min);
  const [maxVal, setMaxVal] = useState(highPrice || max);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      // Check if the current language is Arabic
      if (i18n.language === "ar") {
        range.current.style.right = `${minPercent}%`; // Apply style for Arabic
      } else {
        range.current.style.left = `${minPercent}%`; // Apply default style
      }

      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent, i18n.language]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // Listen for reset changes from Redux store
  useEffect(() => {
    setMinVal(lowPrice || min);
    setMaxVal(highPrice || max);
    minValRef.current = lowPrice || min;
    maxValRef.current = highPrice || max;
  }, [lowPrice, highPrice, min, max]);

  return (
    <div className="mb-4">
      <h1 className="text-lg text-start text-black font-semibold my-2">
        {t("price")}
      </h1>
      <>
        <div className="containerr">
          <input
            type="range"
            min={min}
            max={max}
            step={1000}
            value={minVal}
            onMouseUp={(e) => {
              dispatch(
                changeLowPrice(Math.min(Number(e.target.value), maxVal))
              );
              maxVal
                ? dispatch(changeHighPrice(maxVal))
                : dispatch(changeHighPrice(max));
            }}
            onChange={(event) => {
              const value = Math.min(Number(event.target.value), maxVal);
              setMinVal(value);
              minValRef.current = value;
            }}
            className={`thumb thumbLeft`}
            style={{ zIndex: minVal > max - 100 && "5" }}
          />
          <input
            type="range"
            min={min}
            max={max}
            value={maxVal}
            onMouseUp={(e) => {
              dispatch(
                changeHighPrice(Math.max(Number(e.target.value), minVal))
              );
              minVal
                ? dispatch(changeLowPrice(minVal))
                : dispatch(changeLowPrice(min));
            }}
            onChange={(event) => {
              const value = Math.max(Number(event.target.value), minVal);
              setMaxVal(value);
              maxValRef.current = value;
            }}
            className={`thumb thumbRight`}
          />

          <div className="slider">
            <div className="slider__track" />
            <div ref={range} className="slider__range" />
          </div>
        </div>
        <div className="flex gap-1 justify-end text-[#78797A] mt-3">
          <h1 className="text-[14px] text-[#3F4240] font-bold">{minVal}</h1>

          <span className="text-[#3F4240] font-bold"> - </span>
          <h1 className="text-[14px] text-[#3F4240] font-bold">{maxVal}</h1>
          <span>{t("currency")}</span>
        </div>
      </>
    </div>
  );
};

export default Price;
