import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "../../../components/common/Logo";
const NavLinks = ({ navLinks, logo, bg }) => {
  const { i18n } = useTranslation();
  return (
    <div
      className={`w-full flex items-center gap-3 justify-evenly ${
        bg ? `${bg} p-3 rounded-xl` : "bg-transparent"
      }`}
    >
      <Logo img={logo} />
      {navLinks.map((item, index) => (
        <NavLink
          to={item.path}
          key={index}
          className={`flex items-center gap-1 ${
            bg ? "text-slate-500" : "text-white"
          } home`}
        >
          {item.icon}
          <p>{i18n.language === "ar" ? item.arTitle : item.enTitle}</p>
        </NavLink>
      ))}
    </div>
  );
};

export default NavLinks;
