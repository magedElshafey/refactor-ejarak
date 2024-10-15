import React from "react";
import { useTranslation } from "react-i18next";
import { changeIsEstaplished } from "../../../store/filterSlice";
import { useSelector, useDispatch } from "react-redux";
const Estaplish = () => {
  const { isEstaplished } = useSelector((state) => state.filterSlice);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleRadioChange = (e) => {
    dispatch(changeIsEstaplished(Number(e.target.value))); // تحديث حالة isEstaplished بالقيمة المختارة
  };
  return (
    <div className="w-full flex items-center justify-between">
      <p className="text-[#78797A] font-medium mb-3 text-base md:text-md lg:text-lg">
        {t("Furnished")}
      </p>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <input
            type="radio"
            value={1}
            name="est"
            id="yes"
            checked={isEstaplished === 1}
            onChange={handleRadioChange}
          />
          <label htmlFor="yes">{t("yes")}</label>
        </div>
        <div className="flex items-center gap-1">
          <input
            type="radio"
            value={0}
            name="est"
            id="no"
            checked={isEstaplished === 0}
            onChange={handleRadioChange}
          />
          <label htmlFor="no">{t("no")}</label>
        </div>
      </div>
    </div>
  );
};

export default Estaplish;
