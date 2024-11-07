import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
const StatisticsCard = ({ img, bgColor, title, number, path, state }) => {
  const { t } = useTranslation();

  return (
    <Link
      to={path}
      state={{
        id: state,
      }}
      className={`
        text-[#4D5F65] ${bgColor}
        rounded-2xl flex justify-around items-center py-6 px-2 sm:px-4 w-auto md:max-w-[360px] cursor-pointer`}
    >
      <img src={img} alt={title} />
      <div className="flex flex-col gap-y-4 items-center ">
        <span className="text-xs sm:text-base">{t(title)}</span>
        <span className="font-bold text-3xl sm:text-5xl">{number}</span>
      </div>
    </Link>
  );
};

export default StatisticsCard;
