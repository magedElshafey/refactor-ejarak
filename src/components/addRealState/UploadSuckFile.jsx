import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { IoMdClose } from "react-icons/io";
import { FaFilePdf } from "react-icons/fa";
import img from "../../assets/image-.png";
const UploadSuckFile = ({
  selectedSuck,
  setSelectedSuck,
  previewSuck,
  setPreviewSuck,
}) => {
  const { t } = useTranslation();
  const sukRef = useRef(null);
  const handleSuckChange = (e) => {
    const file = e.target.files[0];
    setSelectedSuck(file);
    const preview = file.type.includes("image/")
      ? URL.createObjectURL(file)
      : "../assets/pdf.png";
    setPreviewSuck(preview);
  };
  const handleSuckClick = () => {
    sukRef.current.click();
  };
  const handleRemoveSuck = () => {
    setSelectedSuck(null);
    setPreviewSuck(null);
  };
  return (
    <div className="mb-5">
      <p className="text-textColor font-medium mb-3">{t("sukFile")}</p>
      <input
        ref={sukRef}
        className="hidden"
        type="file"
        onChange={handleSuckChange}
        accept="image/*,.pdf"
      />
      <label className="bg-[#BDC7BC4D] rounded-[13px] border border-dashed border-[#4D5F65] h-auto min-h-[150px] p-1   flex items-center justify-center flex-wrap  md:flex-nowrap gap-y-1 md:gap-y-0 ">
        {previewSuck ? (
          previewSuck && previewSuck.includes("pdf") ? (
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center justify-center gap-4">
                <FaFilePdf size={50} />
                <p> {previewSuck.filename}</p>
              </div>
              <button
                onClick={() => {
                  handleRemoveSuck();
                  handleSuckClick();
                }}
                className="px-3 py-2 w-[180px] flex items-center justify-center text-white rounded-md bg-maincolorgreen"
              >
                {t("edit")}
              </button>
            </div>
          ) : (
            <div className=" relative w-[100px] h-[100px] lg:w-[130px] lg:h-[130px] xl:w-[170px] xl:h-[170px]">
              <img
                src={previewSuck}
                alt="preveiw/img"
                className="w-full h-full object-cover"
              />
              <div className=" absolute left-0 top-0 w-8 h-8 bg-slate-600 bg-opacity-55 flex items-center justify-center text-white cursor-pointer">
                <IoMdClose
                  size={20}
                  className="text-white"
                  onClick={handleRemoveSuck}
                />
              </div>
            </div>
          )
        ) : (
          <img
            src={img}
            alt="img"
            className=" cursor-pointer w-[37px]"
            onClick={handleSuckClick}
          />
        )}
      </label>
    </div>
  );
};

export default UploadSuckFile;
