import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
const FixedBtn = () => {
  const { t } = useTranslation();
  const { ejarakLogin } = useSelector((state) => state.authSlice);
  return (
    <>
      {ejarakLogin ? (
        <Link
          to="/website/chat/5"
          className="py-2 px-6 flex items-center justify-center fixed bottom-5 right-5 text-white bg-maincolorgreen rounded-md z-[3000]"
        >
          {t("contact")}
        </Link>
      ) : null}
    </>
  );
};

export default FixedBtn;
