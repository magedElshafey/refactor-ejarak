import React from "react";
import { useTranslation } from "react-i18next";
import { FaDownload } from "react-icons/fa";

const RealstateVideoAndSuck = ({ video, suck, setShowSuckModal }) => {
  const { t } = useTranslation();
  const handleDownload = (file) => {
    const link = document.createElement("a");
    link.href = file;
    link.setAttribute("download", "suck file.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-12 xl:gap-16 my-8 ">
      <div className="w-full  bg-white rounded-lg p-3 shadow-xl flex items-center">
        <video
          className="w-full h-[350px] object-cover "
          src={video}
          controls
          muted
          autoPlay
          loop
        ></video>
      </div>
      {suck.length ? (
        <div className=" bg-white rounded-lg p-3 shadow-xl flex flex-col items-center justify-center gap-3">
          {suck[0].endsWith(".pdf") ? (
            <>
              <p className="font-semibold text-md lg:text-lg xl:text-xl">
                {t("view suck file")}
              </p>
              <div className="bg-[#edf7ee] flex items-center justify-center w-40 h-40 rounded-[50%]">
                <FaDownload size={50} className="text-maincolorgreen" />
              </div>
              <button
                onClick={() => handleDownload(suck[0])}
                className=" bg-maincolorgreen text-white p-3 rounded-md font-bold flex items-center justify-center h-fit w-[250px] mx-auto"
              >
                {t("sukFile")}
              </button>
            </>
          ) : (
            <>
              <p className=" font-semibold text-textColor mb-4 text-md md:text-lg lg:text-xl xl:text-2xl">
                {t("suck image")}
              </p>
              <img
                alt="suck"
                src={suck[0]}
                className="w-full md:w-[350px] lg:w-[550px] h-[300px] mx-auto"
              />
            </>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default RealstateVideoAndSuck;