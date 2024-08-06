import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { FaFilePdf } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import img from "../../assets/image-.png";
const EditSuck = ({
  suckPreview,
  setSuckPreview,
  selectedSuck,
  setSelectedSuck,
}) => {
  const { t, i18n } = useTranslation();

  const sukRef = useRef(null);
  const handleSuckChange = (event) => {
    const file = event.target.files[0];
    setSelectedSuck(file);
    const preview = file.type.includes("image/")
      ? URL.createObjectURL(file)
      : "../../../../assets/pdf.png";

    setSuckPreview(preview);
  };
  const handleSuckClick = () => sukRef.current.click();
  const handleDeleteSuck = () => {
    setSelectedSuck(null);
    setSuckPreview("");
  };
  return (
    <div>
      <p className="text-textColor font-medium mb-3">{t("sukFile")}</p>
      <input
        ref={sukRef}
        className="hidden"
        type="file"
        onChange={handleSuckChange}
        accept="image/*,.pdf"
      />
      <label className="bg-[#BDC7BC4D] rounded-[13px] border border-dashed border-[#4D5F65] h-auto min-h-[150px] p-1   flex items-center justify-center flex-wrap  md:flex-nowrap gap-y-1 md:gap-y-0 ">
        {suckPreview ? (
          <div className="flex items-center justify-center  px-1">
            {suckPreview && suckPreview.includes("pdf") ? (
              <div className="flex flex-col items-center gap-4">
                <FaFilePdf size={40} />
                <button
                  onClick={() => handleDeleteSuck()}
                  className="bg-red-600 p-3 text-white w-[140px] flex items-center justify-center rounded-md "
                >
                  {t("del")}
                </button>
              </div>
            ) : (
              <div className="relative w-[100px] h-[100px] lg:w-[130px] lg:h-[130px] xl:w-[170px] xl:h-[170px] mx-3 rounded-xl">
                <img
                  src={suckPreview}
                  alt="preveiw/img"
                  className="w-[100px] h-[100px] lg:w-[130px] lg:h-[130px] xl:w-[170px] xl:h-[170px] mx-3 rounded-xl object-cover"
                />
                <button
                  onClick={() => handleDeleteSuck()}
                  className={`absolute top-0 w-8 h-8 bg-slate-600 bg-opacity-85 rounded-md text-white pointer flex items-center justify-center cursor-pointer ${
                    i18n.language === "ar" ? "right-0" : "left-0"
                  }`}
                >
                  <IoMdClose size={20} />
                </button>
              </div>
            )}
          </div>
        ) : (
          <img
            onClick={handleSuckClick}
            src={img}
            alt="img"
            className=" cursor-pointer w-[37px]"
          />
        )}
      </label>
    </div>
  );
};

export default EditSuck;
