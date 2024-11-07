import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaDownload } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

const RealstateVideoAndSuck = ({
  video,
  suck,
  realStateOwnerId,
  userId,
  role,
}) => {
  const { t, i18n } = useTranslation();
  const handleDownload = (file) => {
    const link = document.createElement("a");
    link.href = file;
    link.setAttribute("download", "suck file.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const [isPlaying, setIsPlaying] = useState(false);
  const handlePlay = () => {
    const videoElement = document.getElementById("video") || null;
    if (isPlaying) {
      videoElement.pause();
    } else {
      videoElement.play();
    }
    setIsPlaying(!isPlaying);
  };
  const [showSuckModal, setShowSuckModal] = useState(false);
  const toggleShowSuckModal = () => setShowSuckModal(!showSuckModal);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-12 xl:gap-16 my-8 ">
        {video ? (
          <div className="w-full  bg-white rounded-lg p-3 shadow-xl flex items-center relative">
            <video
              className="w-full h-[350px] object-cover "
              src={video}
              loop
              muted
              autoPlay={false}
              id="video"
              controls={isPlaying}
            ></video>
            {!isPlaying && (
              <div
                onClick={handlePlay}
                className="absolute inset-0 flex justify-center items-center cursor-pointer bg-black bg-opacity-50"
              >
                <FaPlay className="text-white text-5xl" />
              </div>
            )}
          </div>
        ) : null}
        {role === "super_admin" ||
        (role === "owner" && realStateOwnerId === userId) ? (
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
                  className="w-full md:w-[350px] lg:w-[550px] h-[300px] mx-auto cursor-pointer"
                  onClick={toggleShowSuckModal}
                />
              </>
            )}
          </div>
        ) : null}
      </div>
      <div
        className={`fixed left-0 duration-300 z-[2000] ${
          showSuckModal ? "top-0" : "top-[-400%]"
        } w-screen h-screen bg-black bg-opacity-40`}
      >
        <div
          className={`w-8 h-8 flex top-5 items-center justify-center bg-red-700 cursor-pointer text-white absolute ${
            i18n.language === "ar" ? "right-5" : "left-0"
          }`}
          onClick={toggleShowSuckModal}
        >
          <IoCloseSharp size={20} />
        </div>
        <div className="py-8 w-full h-full flex items-center justify-center">
          <img
            alt="suck"
            src={suck[0]}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>
    </>
  );
};

export default RealstateVideoAndSuck;
