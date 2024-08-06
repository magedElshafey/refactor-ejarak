import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { IoMdClose } from "react-icons/io";
import video from "../../assets/videp.png";
const EditVideo = ({
  setVideoPreview,
  videoPreview,
  selectedVideo,
  setSelectedVideo,
}) => {
  const { t } = useTranslation();
  const videoInputRef = useRef(null);
  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    const preview = URL.createObjectURL(file);
    setSelectedVideo(file);
    setVideoPreview(preview);
  };
  const removeVideo = () => {
    setSelectedVideo(null);
    setVideoPreview("");
  };
  const handleVideoClick = () => videoInputRef.current.click();
  return (
    <div>
      <p className="text-textColor text-[18px] font-medium mb-3">
        {t("videoRole")}
      </p>
      <input
        ref={videoInputRef}
        className="hidden"
        type="file"
        onChange={handleVideoChange}
        accept="video/*"
      />
      <label className="bg-[#BDC7BC4D] rounded-[13px] border border-dashed border-[#4D5F65]  h-[140px] flex items-center justify-center">
        {videoPreview ? (
          <div className="w-full h-full relative">
            <video className="w-full h-full object-contain py-3">
              <source src={videoPreview} />
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

export default EditVideo;
