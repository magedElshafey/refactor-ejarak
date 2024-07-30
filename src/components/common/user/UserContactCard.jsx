import React from "react";
import { useTranslation } from "react-i18next";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TiMessages } from "react-icons/ti";
const UserContactCard = ({ role, phone, whatsapp, chat }) => {
  const { t } = useTranslation();
  return (
    <div>
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
    </div>
  );
};

export default UserContactCard;
