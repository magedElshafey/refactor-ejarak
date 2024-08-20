import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import UserContactCard from "../common/user/UserContactCard";
const RealstateOwnerCard = ({
  name,
  img,
  phone,
  whatsapp,
  id,
  ejarakLogin,
}) => {
  const { t } = useTranslation();
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-dashed border-textColor">
      <div className="flex flex-col items-center md:flex-row gap-4 justify-between">
        <div>
          <p className=" font-extrabold text-lg md:text-xl lg:text-2xl mb-3">
            {t("ownerDetails")}
          </p>
          <div className="flex items-center gap-2">
            <img
              alt={name}
              src={img}
              className=" w-16 h-16 rounded-[50%] object-cover cursor-pointer"
            />
            <Link
              to={`/website/realstate-owner/${id}`}
              className=" text-textColor underline font-medium cursor-pointer text-lg md:text-xl lg:text-2xl xl:text-3xl"
            >
              {name}
            </Link>
          </div>
        </div>

        <UserContactCard
          phone={phone}
          whatsapp={whatsapp}
          chat={`/website/chat/${id}`}
          ejarakLogin={ejarakLogin}
        />
      </div>
    </div>
  );
};

export default RealstateOwnerCard;
