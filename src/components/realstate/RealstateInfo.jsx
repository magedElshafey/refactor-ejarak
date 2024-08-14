import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
const RealstateInfo = ({
  name,
  realStateOwnerId,
  userId,
  status,
  id,
  isDashboard,
}) => {
  const { i18n } = useTranslation();
  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 justify-between flex-wrap">
        <p className=" font-extrabold text-textColor text-lg md:text-xl lg:text-2xl ">
          {name}
        </p>
        {isDashboard ? null : (
          <div className="md:w-[180px]">
            {realStateOwnerId === userId && status !== "pending" ? (
              <Link
                className="bg-maincolorgreen text-white p-3 rounded-md font-bold flex items-center justify-center"
                to={`/website/realstate/reservation-details/${id}`}
              >
                {i18n.language === "ar" ? "حجوزات العقار" : "Reservations"}
              </Link>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default RealstateInfo;
