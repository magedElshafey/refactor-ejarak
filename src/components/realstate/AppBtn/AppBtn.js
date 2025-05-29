import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import logo from "../../../assets/ejark white.png";
const AppBtn = () => {
  const { t } = useTranslation();
  const [storeLink, setStoreLink] = useState(null);
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Check if the device is iOS
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      setStoreLink({
        platform: "ios",
        url: "https://apps.apple.com/eg/app/ejark-%D8%A5%D9%8A%D8%AC%D8%A7%D8%B1%D9%83/id6654921635", // ضع رابط تطبيقك على App Store هنا
      });
    }
    // Check if the device is Android
    else if (/android/i.test(userAgent)) {
      setStoreLink({
        platform: "android",
        url: "https://play.google.com/store/apps/details?id=com.ejarksa.leasing", // ضع رابط تطبيقك على Play Store هنا
      });
    }
  }, []);

  if (!storeLink) return null;
  return (
    <div className="md:hidden">
      <a
        href={storeLink.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white px-6 py-2 flex items-center justify-center gap-3  shadow-lg bg-maincolorgreen transition my-3"
      >
        <span>{t("Watch it on the app")}</span>
        <img
          alt="logo"
          src={logo}
          loading="lazy"
          className="w-12 h-12 object-contain"
        />
      </a>
    </div>
  );
};

export default AppBtn;
/**
 * import { useEffect, useState } from "react";

const AppDownloadButton = () => {
 

 

  
};

export default AppDownloadButton;

 */
