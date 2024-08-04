import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { IoMdClose } from "react-icons/io";
import video from "../../assets/videp.png";
const UploadVideo = ({
  selectedVideo,
  setSelectedVideo,
  videoPreview,
  setVideoPrview,
  step,
  setStep,
}) => {
  const { t } = useTranslation();
  const videoRef = useRef(null);
  const handleVideoClick = () => {
    videoRef.current.click();
  };
  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    setSelectedVideo(file);
    const preveiw = URL.createObjectURL(file);
    setVideoPrview(preveiw);
  };
  const removeVideo = () => {
    setSelectedVideo(null);
    setVideoPrview(null);
  };

  return (
    <div>
      <p className="text-textColor font-medium mb-3">{t("videoRole")}</p>
      <input
        ref={videoRef}
        className="hidden"
        type="file"
        onChange={handleVideoChange}
        accept="video/*"
      />
      <label className="bg-[#BDC7BC4D] rounded-[13px] border border-dashed border-[#4D5F65]  h-[200px] flex items-center justify-center p-3">
        {selectedVideo ? (
          <div className="w-full h-full relative">
            <video className="w-full h-full object-cover ">
              <source src={videoPreview} type={selectedVideo.type} />
              Your browser does not support the video tag.
            </video>
            <div className=" absolute left-0 top-0 w-8 h-8 bg-slate-600 bg-opacity-55 flex items-center justify-center text-white cursor-pointer">
              <IoMdClose
                size={20}
                className="text-white"
                onClick={removeVideo}
              />
            </div>
          </div>
        ) : (
          <img
            src={video}
            alt="img"
            className=" cursor-pointer w-[37px]"
            onClick={handleVideoClick}
          />
        )}
      </label>
    </div>
  );
};

export default UploadVideo;
