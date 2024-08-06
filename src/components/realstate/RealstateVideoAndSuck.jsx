import React from "react";
import { useTranslation } from "react-i18next";
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
    <div className="flex items-center justify-between gap-4 md:gap-6 lg:gap-8 my-8">
      {video ? (
        <video
          className="w-full h-[250px] object-cover "
          src={video}
          controls
          muted
          autoPlay
          loop
        ></video>
      ) : null}
      {suck?.length ? (
        suck[0].endsWith(".pdf") ? (
          <button
            onClick={() => handleDownload(suck[0])}
            className=" bg-maincolorgreen text-white p-3 rounded-md font-bold flex items-center justify-center"
          >
            {t("sukFile")}
          </button>
        ) : (
          <img
            onClick={() => setShowSuckModal(true)}
            alt="suckfile"
            src={suck[0]}
            className="w-[100px] h-[100px] cursor-pointer object-cover"
          />
        )
      ) : null}
    </div>
  );
};

export default RealstateVideoAndSuck;
