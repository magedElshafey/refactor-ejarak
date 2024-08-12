import React, { useRef, useState } from "react";
import { FaGlobe } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import useClickOutside from "../../../hooks/useClickOutside";
import { useMutation } from "react-query";
import { changeLanguage } from "../../../services/post/changeLangauge";
import { useSelector } from "react-redux";
const LangMenu = ({ bg }) => {
  const { ejarakLogin } = useSelector((state) => state.authSlice);
  const { i18n, t } = useTranslation();
  const [showLang, setShowLang] = useState(false);
  const menu = useRef(null);
  const { mutate } = useMutation((v) => changeLanguage(v), {
    onSuccess: (data) => {
      if (data?.data?.status) {
        window.location.reload();
      }
    },
  });
  const handleChangeLang = (v) => {
    localStorage.setItem("lang", JSON.stringify(v));
    const data = {
      language: v,
    };
    mutate(data);
    i18n.changeLanguage(v);
    if (!ejarakLogin) {
      window.location.reload();
    } else {
      return;
    }
  };
  const closeMenu = () => setShowLang(false);
  useClickOutside(menu, closeMenu);
  return (
    <div
      onClick={() => setShowLang(!showLang)}
      ref={menu}
      className="cursor-pointer relative"
    >
      <div
        className={`w-8 h-8 md:w-12 md:h-12 md:p-2 flex items-center rounded-md justify-center md:border mx-1 md:mx-0  ${
          bg
            ? `${bg} text-slate-500`
            : "md:border-white text-white bg-transparent"
        }`}
      >
        <FaGlobe size={20} />
      </div>
      <ul
        className={`absolute duration-300 ${
          i18n.language === "ar" ? "right-0" : "left-0"
        } bottom-[-80px] bg-white shadow-lg z-50 p-3 rounded-md ${
          showLang ? "block" : "hidden"
        }`}
      >
        <li
          onClick={() => handleChangeLang("ar")}
          className=" cursor-pointer mb-3"
        >
          {t("ar")}
        </li>
        <li onClick={() => handleChangeLang("en")} className=" cursor-pointer ">
          {t("en")}
        </li>
      </ul>
    </div>
  );
};

export default LangMenu;
