import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import useClickOutside from "../../../hooks/useClickOutside";
const CreateContractBtn = ({ id }) => {
  const { t, i18n } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const toggleShowModal = () => setShowModal(!showModal);
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setShowModal(false));
  return (
    <div
      ref={modalRef}
      onClick={toggleShowModal}
      className=" cursor-pointer relative"
    >
      <button className="flex items-center  p-3 rounded-xl justify-center bg-maincolorgreen text-white  duration-300 min-w-[230px] gap-2 hover:bg-white hover:text-maincolorgreen hover:border hover:border-maincolorgreen">
        <p>{t("createContract")}</p>
        <IoIosArrowDown size={20} />
      </button>
      <div
        className={`absolute top-[45px] ${
          i18n.language === "ar" ? "right-0" : "left-0"
        } text-start bg-white p-2 rounded-md shadow-2xl z-50 duration-300 ${
          showModal ? "block" : "hidden"
        } `}
      >
        <Link
          className="block p-1 duration-300 hover:bg-slate-200 rounded-md"
          to={`/website/create-contract/manual/${id}`}
        >
          {t("manualCreate")}
        </Link>
        <Link
          className="block p-1 duration-300 hover:bg-slate-200 rounded-md"
          to={`/website/create-contract/electronic/${id}`}
        >
          {t("viaSpons")}
        </Link>
      </div>
    </div>
  );
};

export default CreateContractBtn;
