import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
const HandleLanguages = () => {
  const { i18n } = useTranslation();
  useEffect(() => {
    localStorage.setItem("lang", JSON.stringify(i18n.language));
  }, [i18n.language]);

  useEffect(() => {
    document.documentElement.setAttribute("lang", i18n.language);
    document.getElementsByTagName("body")[0].style.direction =
      i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return null;
};

export default HandleLanguages;
