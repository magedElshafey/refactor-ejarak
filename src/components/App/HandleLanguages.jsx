import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
const HandleLanguages = () => {
  const { i18n } = useTranslation();
  useEffect(() => {
    const savedLang = JSON.parse(localStorage.getItem("lang"));
    if (savedLang) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  useEffect(() => {
    document.documentElement.setAttribute("lang", i18n.language);
    if (i18n.language === "ar") {
      document.body.style.direction = "rtl";
    } else {
      document.body.style.direction = "ltr";
    }
  }, [i18n.language]);

  return null;
};

export default HandleLanguages;
