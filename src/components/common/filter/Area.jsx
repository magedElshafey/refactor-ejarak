import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import style from "./are.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeArea } from "../../../store/filterSlice";

const Area = ({ min, max }) => {
  const { area } = useSelector((state) => state.filterSlice);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const range = useRef(null);

  // Initialize area value to max
  const [areaVal, setAreaVal] = useState(max); // 1000

  useEffect(() => {
    setAreaVal(max - (area - min));
  }, [area, max, min]);
  console.log("area value", areaVal);
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
      <h1 className="text-lg text-start text-black font-semibold my-2">
        {t("allArea")}
      </h1>
      <div className={style.container}>
        <input
          type="range"
          min={min}
          max={max}
          value={areaVal}
          onMouseUp={(e) => {
            dispatch(changeArea(max - (Number(e.target.value) - min)));
          }}
          onChange={(event) => {
            setAreaVal(Number(event.target.value));
          }}
          className={`${style.thumb} ${style.thumbRight}`}
        />
        <div className={style.slider}>
          <div className={style.slider__track} />
          <div ref={range} className={style.slider__range} />
        </div>
      </div>
      <div className="flex gap-1 justify-end text-[#78797A] mt-2">
        <h1 className="text-[14px] text-[#3F4240] font-bold">{areaVal - 1}</h1>
        <span>{t("meterSquare")}</span>
      </div>
    </div>
  );
};

export default Area;

// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { useTranslation } from "react-i18next";
// import style from "./are.module.css";
// import { useDispatch, useSelector } from "react-redux";
// import { changeArea, resetFilter } from "../../../store/filterSlice";

// const Area = ({ min, max }) => {
//   const { area } = useSelector((state) => state.filterSlice);
//   const dispatch = useDispatch();
//   const { t } = useTranslation();
//   const range = useRef(null);

//   // Initialize area value to max
//   const [areaVal, setAreaVal] = useState(max);

//   useEffect(() => {
//     // Set areaVal to max when component mounts or area state changes
//     setAreaVal(max - (area - min));
//   }, [area, max, min]);

//   const getPercent = useCallback(
//     (value) => Math.round(((value - min) / (max - min)) * 100),
//     [min, max]
//   );

//   useEffect(() => {
//     const maxPercent = getPercent(areaVal);
//     if (range.current) {
//       range.current.style.width = `${maxPercent}%`;
//     }
//   }, [areaVal, getPercent]);

//   useEffect(() => {
//     if (area === "" || area === undefined) {
//       setAreaVal(max); // Reset areaVal to max on reset
//     }
//   }, [area, max]);

//   return (
//     <div className="mb-4">
//       <h1 className="text-lg text-start text-black font-semibold my-2">
//         {t("allArea")}
//       </h1>
//       <>
//         <div className={style.container}>
//           <input
//             type="range"
//             min={min}
//             max={max}
//             value={areaVal}
//             onMouseUp={(e) => {
//               dispatch(changeArea(max - (Number(e.target.value) - min)));
//             }}
//             onChange={(event) => {
//               setAreaVal(Number(event.target.value));
//             }}
//             className={`${style.thumb} ${style.thumbRight}`}
//           />
//           <div className={style.slider}>
//             <div className={style.slider__track} />
//             <div ref={range} className={style.slider__range} />
//           </div>
//         </div>
//         <div className="flex gap-1 justify-end text-[#78797A] mt-2">
//           <h1 className="text-[14px] text-[#3F4240] font-bold">
//             {max - (areaVal - min)}
//           </h1>
//           <span>{t("meterSquare")}</span>
//         </div>
//       </>
//     </div>
//   );
// };

// export default Area;

// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { useTranslation } from "react-i18next";
// import style from "./are.module.css";
// import { useDispatch, useSelector } from "react-redux";
// import { changeArea } from "../../../store/filterSlice";

// const Area = ({ min, max }) => {
//   const { area } = useSelector((state) => state.filterSlice);
//   const [areaVal, setAreaVal] = useState(max); // تحديد القيمة الابتدائية كأعلى قيمة
//   const dispatch = useDispatch();
//   const { t } = useTranslation();
//   const range = useRef(null);

//   useEffect(() => {
//     setAreaVal(max); // إعادة تعيين القيمة الابتدائية عند تغيير `max`
//   }, [max]);

//   const getPercent = useCallback(
//     (value) => Math.round(((value - min) / (max - min)) * 100),
//     [min, max]
//   );

//   useEffect(() => {
//     const maxPercent = getPercent(areaVal);
//     if (range.current) {
//       range.current.style.width = `${100 - maxPercent}%`; // عرض المساحة المتبقية
//     }
//   }, [areaVal, getPercent]);

//   return (
//     <div className="mb-4">
//       <h1 className="text-lg text-start text-black font-semibold my-2">
//         {t("allArea")}
//       </h1>
//       <div className={style.container}>
//         <input
//           type="range"
//           min={min}
//           max={max}
//           value={areaVal}
//           onMouseUp={(e) => {
//             dispatch(changeArea(Number(e.target.value))); // تحديث القيمة في الـ Redux
//           }}
//           onChange={(event) => {
//             setAreaVal(Number(event.target.value)); // تحديث القيمة المحلية للشريط
//           }}
//           className={`${style.thumb} ${style.thumbRight}`}
//         />
//         <div className={style.slider}>
//           <div className={style.slider__track} />
//           <div ref={range} className={style.slider__range} />
//         </div>
//       </div>
//       <div className="flex gap-1 justify-end text-[#78797A] mt-2">
//         <h1 className="text-[14px] text-[#3F4240] font-bold">{areaVal}</h1>
//         <span>{t("meterSquare")}</span>
//       </div>
//     </div>
//   );
// };

// export default Area;

// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { useTranslation } from "react-i18next";
// import style from "./are.module.css";
// import { useDispatch, useSelector } from "react-redux";
// import { changeArea, resetFilter } from "../../../store/filterSlice";

// const Area = ({ min, max }) => {
//   const { area } = useSelector((state) => state.filterSlice);
//   const [areaVal, setAreaVal] = useState(max);
//   const dispatch = useDispatch();
//   const { t } = useTranslation();
//   const range = useRef(null);

//   useEffect(() => {
//     setAreaVal(max);
//   }, [max]);

//   // حساب النسبة معاكسة (القيمة المتبقية)
//   const getPercent = useCallback(
//     (value) => Math.round(((value - min) / (max - min)) * 100),
//     [min, max]
//   );

//   useEffect(() => {
//     const maxPercent = getPercent(areaVal);
//     if (range.current) {
//       range.current.style.width = `${100 - maxPercent}%`; // عكس النسبة لتتناسب مع التقدم
//     }
//   }, [areaVal, getPercent]);

//   // إعادة تعيين المنزلق عند الضغط على زر إعادة التعيين

//   return (
//     <div className="mb-4">
//       <h1 className="text-lg text-start text-black font-semibold my-2">
//         {t("allArea")}
//       </h1>
//       <>
//         <div className={style.container}>
//           <input
//             type="range"
//             min={min}
//             max={max}
//             value={areaVal}
//             onMouseUp={(e) => {
//               dispatch(changeArea(Number(e.target.value)));
//             }}
//             onChange={(event) => {
//               setAreaVal(Number(event.target.value));
//             }}
//             className={`${style.thumb} ${style.thumbRight}`}
//           />

//           <div className={style.slider}>
//             <div className={style.slider__track} />
//             <div ref={range} className={style.slider__range} />
//           </div>
//         </div>
//         <div className="flex gap-1 justify-end text-[#78797A] mt-2">
//           <h1 className="text-[14px] text-[#3F4240] font-bold">{areaVal}</h1>
//           <span>{t("meterSquare")}</span>
//         </div>
//       </>
//     </div>
//   );
// };

// export default Area;

// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { useTranslation } from "react-i18next";
// import style from "./are.module.css";
// import { useDispatch, useSelector } from "react-redux";
// import { changeArea } from "../../../store/filterSlice";

// const Area = ({ min, max }) => {
//   const { area } = useSelector((state) => state.filterSlice);
//   const [areaVal, setAreaVal] = useState(max);
//   const dispatch = useDispatch();
//   const { t } = useTranslation();
//   const range = useRef(null);

//   useEffect(() => {
//     setAreaVal(max);
//   }, [max]);

//   // حساب النسبة
//   const getPercent = useCallback(
//     (value) => Math.round(((max - value) / (max - min)) * 100),
//     [min, max]
//   );

//   useEffect(() => {
//     const maxPercent = getPercent(areaVal);
//     if (range.current) {
//       range.current.style.width = `${maxPercent}%`;
//     }
//   }, [areaVal, getPercent]);

//   return (
//     <div className="mb-4">
//       <h1 className="text-lg text-start text-black font-semibold my-2">
//         {t("allArea")}
//       </h1>
//       <>
//         <div className={style.container}>
//           <input
//             type="range"
//             min={min}
//             max={max}
//             value={areaVal}
//             onMouseUp={(e) => {
//               dispatch(changeArea(Number(e.target.value)));
//             }}
//             onChange={(event) => {
//               setAreaVal(Number(event.target.value));
//             }}
//             className={`${style.thumb} ${style.thumbRight}`}
//           />

//           <div className={style.slider}>
//             <div className={style.slider__track} />
//             <div ref={range} className={style.slider__range} />
//           </div>
//         </div>
//         <div className="flex gap-1 justify-end text-[#78797A] mt-2">
//           <h1 className="text-[14px] text-[#3F4240] font-bold">{areaVal}</h1>
//           <span>{t("meterSquare")}</span>
//         </div>
//       </>
//     </div>
//   );
// };

// export default Area;

// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { useTranslation } from "react-i18next";
// import style from "./are.module.css";
// import { useDispatch, useSelector } from "react-redux";
// import { changeArea } from "../../../store/filterSlice";

// const Area = ({ min, max }) => {
//   const { area } = useSelector((state) => state.filterSlice);
//   const [areaVal, setareaVal] = useState(max - (area - min));
//   const dispatch = useDispatch();
//   const { t } = useTranslation();
//   const range = useRef(null);

//   useEffect(() => {
//     setareaVal(max - (area - min));
//   }, [area, min, max]);

//   // Convert to percentage
//   const getPercent = useCallback(
//     (value) => Math.round(((value - min) / (max - min)) * 100),
//     [min, max]
//   );

//   useEffect(() => {
//     const maxPercent = getPercent(areaVal);
//     if (range.current) {
//       range.current.style.width = `${maxPercent}%`;
//     }
//   }, [areaVal, getPercent]);

//   return (
//     <div className="mb-4">
//       <h1 className="text-lg text-start text-black font-semibold my-2">
//         {t("allArea")}
//       </h1>
//       <>
//         <div className={style.container}>
//           <input
//             type="range"
//             min={min}
//             max={max}
//             value={areaVal}
//             onMouseUp={(e) => {
//               dispatch(changeArea(max - (Number(e.target.value) - min)));
//             }}
//             onChange={(event) => {
//               setareaVal(Number(event.target.value));
//             }}
//             className={`${style.thumb} ${style.thumbRight}`}
//           />

//           <div className={style.slider}>
//             <div className={style.slider__track} />
//             <div ref={range} className={style.slider__range} />
//           </div>
//         </div>
//         <div className="flex gap-1 justify-end text-[#78797A] mt-2">
//           <h1 className="text-[14px] text-[#3F4240] font-bold">
//             {max - (areaVal - min)}
//           </h1>
//           <span>{t("meterSquare")}</span>
//         </div>
//       </>
//     </div>
//   );
// };

// export default Area;

// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { useTranslation } from "react-i18next";
// import style from "./are.module.css";
// import { useDispatch, useSelector } from "react-redux";
// import { changeArea } from "../../../store/filterSlice";

// const Area = ({ min, max }) => {
//   const { area } = useSelector((state) => state.filterSlice);
//   const [areaVal, setareaVal] = useState(max - (area - min));
//   const dispatch = useDispatch();
//   const { t } = useTranslation();
//   const range = useRef(null);

//   useEffect(() => {
//     setareaVal(max - (area - min));
//   }, [area, min, max]);

//   // Convert to percentage
//   const getPercent = useCallback(
//     (value) => Math.round(((value - min) / (max - min)) * 100),
//     [min, max]
//   );

//   useEffect(() => {
//     const maxPercent = getPercent(areaVal);
//     if (range.current) {
//       range.current.style.width = `${maxPercent}%`;
//     }
//   }, [areaVal, getPercent]);

//   return (
//     <div className="mb-4">
//       <h1 className="text-lg text-start text-black font-semibold my-2">
//         {t("allArea")}
//       </h1>
//       <>
//         <div className={style.container}>
//           <input
//             type="range"
//             min={min}
//             max={max}
//             value={areaVal}
//             onMouseUp={(e) => {
//               dispatch(changeArea(max - (Number(e.target.value) - min)));
//             }}
//             onChange={(event) => {
//               setareaVal(Number(event.target.value));
//             }}
//             className={`${style.thumb} ${style.thumbRight}`}
//           />

//           <div className={style.slider}>
//             <div className={style.slider__track} />
//             <div ref={range} className={style.slider__range} />
//           </div>
//         </div>
//         <div className="flex gap-1 justify-end text-[#78797A] mt-2">
//           <h1 className="text-[14px] text-[#3F4240] font-bold">
//             {max - (areaVal - min)}
//           </h1>
//           <span>{t("meterSquare")}</span>
//         </div>
//       </>
//     </div>
//   );
// };

// export default Area;

// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { useTranslation } from "react-i18next";
// import style from "./are.module.css";
// import { useDispatch, useSelector } from "react-redux";
// import { changeArea } from "../../../store/filterSlice";

// const Area = ({ min, max }) => {
//   const { area } = useSelector((state) => state.filterSlice);
//   const [areaVal, setareaVal] = useState(max - (area - min));
//   const dispatch = useDispatch();
//   const { t } = useTranslation();
//   const range = useRef(null);

//   useEffect(() => {
//     setareaVal(max - (area - min));
//   }, [area, min, max]);

//   // Convert to percentage
//   const getPercent = useCallback(
//     (value) => Math.round(((value - min) / (max - min)) * 100),
//     [min, max]
//   );

//   useEffect(() => {
//     const maxPercent = getPercent(areaVal);
//     if (range.current) {
//       range.current.style.width = `${maxPercent}%`;
//     }
//   }, [areaVal, getPercent]);

//   return (
//     <div className="mb-4">
//       <h1 className="text-lg text-start  text-black font-semibold my-2">
//         {t("allArea")}
//       </h1>
//       <>
//         <div className={style.container}>
//           <input
//             type="range"
//             min={min}
//             max={max}
//             value={areaVal}
//             onMouseUp={(e) => {
//               dispatch(changeArea(max - Number(e.target.value) + min));
//             }}
//             onChange={(event) => {
//               setareaVal(Number(event.target.value));
//             }}
//             className={`${style.thumb} ${style.thumbRight}`}
//           />

//           <div className={style.slider}>
//             <div className={style.slider__track} />
//             <div ref={range} className={style.slider__range} />
//           </div>
//         </div>
//         <div className="flex gap-1 justify-end text-[#78797A] mt-2">
//           <h1 className="text-[14px] text-[#3F4240] font-bold">
//             {max - areaVal + min}
//           </h1>
//           <span>{t("meterSquare")}</span>
//         </div>
//       </>
//     </div>
//   );
// };

// export default Area;

// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { useTranslation } from "react-i18next";
// import style from "./are.module.css";
// import { useDispatch, useSelector } from "react-redux";
// import { changeArea } from "../../../store/filterSlice";
// const Area = ({ min, max }) => {
//   const { area } = useSelector((state) => state.filterSlice);
//   const [areaVal, setareaVal] = useState(area || min);
//   const dispatch = useDispatch();

//   const { t } = useTranslation();

//   const range = useRef(null);
//   useEffect(() => {
//     setareaVal(area || min);
//   }, [area, min]);
//   // Convert to percentage
//   const getPercent = useCallback(
//     (value) => Math.round(((value - min) / (max - min)) * 100),
//     [min, max]
//   );
//   useEffect(() => {
//     const maxPercent = getPercent(areaVal);

//     if (range.current) {
//       range.current.style.width = `${maxPercent}%`;
//     }
//   }, [areaVal, getPercent]);
//   return (
//     <div className="mb-4">
//       <h1 className="text-lg text-start  text-black font-semibold my-2">
//         {t("allArea")}
//       </h1>
//       <>
//         <div className={style.container}>
//           <input
//             type="range"
//             min={min}
//             max={max}
//             value={areaVal}
//             onMouseUp={(e) => {
//               dispatch(changeArea(Number(e.target.value)));
//             }}
//             onChange={(event) => {
//               setareaVal(Number(event.target.value));
//             }}
//             className={`${style.thumb} ${style.thumbRight}`}
//           />

//           <div className={style.slider}>
//             <div className={style.slider__track} />
//             <div ref={range} className={style.slider__range} />
//           </div>
//         </div>
//         <div className="flex gap-1 justify-end text-[#78797A] mt-2">
//           <h1 className="text-[14px] text-[#3F4240] font-bold">{areaVal}</h1>
//           <span>{t("meterSquare")}</span>
//         </div>
//       </>
//     </div>
//   );
// };

// export default Area;
