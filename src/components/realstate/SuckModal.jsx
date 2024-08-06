import React from "react";
import { IoMdClose } from "react-icons/io";
import { useTranslation } from "react-i18next";
const SuckModal = ({ showSuckModal, setShowSuckModal, suck }) => {
  const { t } = useTranslation();
  return (
    <div
      className={`fixed top-0 duration-300 w-screen h-screen bg-black bg-opacity-30 flex items-center justify-center ${
        showSuckModal ? "left-0" : "left-[-400%]"
      }`}
    >
      <div className="container mx-auto px-8">
        <div className="w-full md:w-[350px] lg:w-[550px] bg-white rounded-lg p-3 shadow-xl">
          <IoMdClose
            size={30}
            className="text-red-500 cursor-pointer mb-5"
            onClick={() => setShowSuckModal(false)}
          />
          <p className=" font-semibold text-textColor mb-4 text-md md:text-lg lg:text-xl xl:text-2xl">
            {t("suck image")}
          </p>
          <img alt="suck" src={suck[0]} className="w-full h-[300px]" />
        </div>
      </div>
    </div>
  );
};

export default SuckModal;
