import React from "react";
import building from "../../assets/building.png";
import { useTranslation } from "react-i18next";
const PendingRealstate = ({ num }) => {
  const { i18n } = useTranslation();
  return (
    <div className="my-8">
      <div className="flex justify-center items-center mb-2">
        <img
          src={building}
          alt="building"
          className=" w-[243px] h-[174px] object-cover"
        />
      </div>
      <p
        className="py-3 rounded-lg text-center text-red-600 font-bold text-xl"
        style={{ backgroundColor: "rgba(216, 0, 3, 0.06)" }}
      >
        {i18n.language === "ar"
          ? `هذا الإعلان رقم ${num} قيد المراجعة`
          : `This advertisement number ${num} is pending`}
      </p>
    </div>
  );
};

export default PendingRealstate;
