import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaHeadphonesSimple } from "react-icons/fa6";
const ContactWithCustomerServiceBtn = () => {
  const { t } = useTranslation();
  return (
    <Link
      to="/website/chat/5"
      className="flex items-center justify-center gap-2  text-white bg-[#1191cf] p-3 rounded-lg w-[160px] md:w-[200px] "
    >
      <p>{t("contact")}</p>
      <FaHeadphonesSimple size={20} />
    </Link>
  );
};

export default ContactWithCustomerServiceBtn;
