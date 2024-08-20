import React from "react";
import { useTranslation } from "react-i18next";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TiMessages } from "react-icons/ti";
import { useSelector } from "react-redux";
const UserContactCard = ({ role, phone, whatsapp, chat }) => {
  const { t } = useTranslation();
  const { ejarakLogin } = useSelector((state) => state.authSlice);

  return (
    <div>
      {ejarakLogin ? (
        <>
          <p className="mb-4 font-medium text-textColor">
            {role === "owner" ? t("tenantContact") : t("ownerContact")}
          </p>
          <div className="flex items-center  gap-3 flex-wrap">
            <a
              href={phone}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center p-2 rounded-xl call-btn"
            >
              <FaPhoneAlt size={20} />
            </a>
            <a
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center p-2 rounded-xl btn-whats"
            >
              <FaWhatsapp size={20} />
            </a>
            <Link
              to={chat}
              className="flex items-center justify-center p-2 rounded-xl btn-msg"
            >
              <TiMessages size={20} />
            </Link>
          </div>
        </>
      ) : (
        <Link
          to="/auth/login"
          className=" underline text-red-600 text-xs md:text-base"
        >
          {t("login need")}
        </Link>
      )}
    </div>
  );
};

export default UserContactCard;
