import React from "react";
import { useTranslation } from "react-i18next";
import { LuNewspaper } from "react-icons/lu";
const BookingBtn = ({ toggleShowBookingForm }) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={toggleShowBookingForm}
      className="bg-maincolorgreen text-white flex items-center justify-center gap-2 p-3 rounded-lg w-[160px] md:w-[200px] lg:w-[250px]"
    >
      <p>{t("book")}</p>
      <LuNewspaper size={20} />
    </button>
  );
};

export default BookingBtn;
