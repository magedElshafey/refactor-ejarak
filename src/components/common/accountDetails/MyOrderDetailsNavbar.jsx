import React from "react";
import { myOrdersDetailsNavbar } from "../../../data/data";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
const MyOrderDetailsNavbar = () => {
  const { t } = useTranslation();
  const { userData } = useSelector((state) => state.authSlice);
  const role = userData?.account?.type;
  return (
    <div className="w-full text-nowrap   flex items-center gap-3 md:gap-4 lg:gap-6 overflow-x-auto overflow-y-hidden ">
      {myOrdersDetailsNavbar
        ?.filter((item) => item.role.includes(role))
        .map((item, index) => (
          <NavLink
            className="home text-md md:text-lg lg:text-xl font-bold"
            key={index}
            to={item.path}
          >
            {t(item.title)}
          </NavLink>
        ))}
    </div>
  );
};

export default MyOrderDetailsNavbar;
