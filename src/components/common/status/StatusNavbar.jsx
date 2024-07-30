import React from "react";
import { useTranslation } from "react-i18next";
const StatusNavbar = ({ statusFilter, activeIndex, setActiveIndex }) => {
  const { i18n } = useTranslation();

  return (
    <div className="mb-4 w-full bg-[#f6f5f5] p-3 rounded-lg flex items-center gap-3 md:gap-4 lg:gap-6 overflow-x-auto ">
      {statusFilter?.map((item, index) => (
        <p
          onClick={() => setActiveIndex(index)}
          key={index}
          className={`cursor-pointer text-base md:text-md lg:text-lg duration-300 ${
            activeIndex === index ? "text-maincolorgreen font-bold" : null
          }`}
        >
          {i18n.language === "ar" ? item.arTitle : item.enTitle}
        </p>
      ))}
    </div>
  );
};

export default StatusNavbar;
