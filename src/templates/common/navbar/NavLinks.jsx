import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "../../../components/common/Logo";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const NavLinks = ({ navLinks, logo, bg }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.authSlice);
  const isLogin = auth.ejarakLogin;
  const type = auth?.userData?.account?.type;
  return (
    <div
      className={`w-full flex items-center gap-3 justify-evenly ${
        bg ? `${bg} p-3 rounded-xl` : "bg-transparent"
      }`}
    >
      <Logo img={logo} />
      {navLinks.map((item, index) => (
        <NavLink
          onClick={(e) =>
            item.onClick && item.onClick(e, isLogin, navigate, type)
          }
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
