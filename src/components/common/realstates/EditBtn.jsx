import React from "react";
import { useTranslation } from "react-i18next";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const EditBtn = ({ id }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleClick = () => navigate(`/website/edit-realstate/${id}`);
  return (
    <div>
      <button
        onClick={handleClick}
        className="w-28 flex justify-around gap-x-3 items-center cursor-pointer border-2 p-2 rounded-lg transition-all  text-maincolorgreen border-maincolorgreen hover:bg-maincolorgreen hover:text-white hover:border-white"
      >
        <p>{t("edit")}</p>
        <FaRegEdit size={20} />
      </button>
    </div>
  );
};

export default EditBtn;
