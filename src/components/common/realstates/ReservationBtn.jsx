import React from "react";
import { useTranslation } from "react-i18next";
import { MdOutlineDateRange } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const ReservationBtn = ({ id }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleClick = () =>
    navigate(`/website/realstate/reservation-details/${id}`);
  return (
    <button
      onClick={handleClick}
      className="w-28 flex justify-around gap-x-3 items-center cursor-pointer border-2 p-2 rounded-lg transition-all text-[#FFA817] border-[#FFA817] hover:bg-[#FFA817] hover:text-white hover:border-white"
    >
      <p>{t("reservation")}</p>
      <MdOutlineDateRange size={20} />
    </button>
  );
};

export default ReservationBtn;
