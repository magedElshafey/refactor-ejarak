import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { IoMdClose } from "react-icons/io";

import { FaPlus, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img from "../../assets/image-.png";
const RealstateImages = ({
  previewsPhotos,
  setPreveiwsPhotos,
  selectedPhotos,
  setSelectedPhotos,
  realstateId,
  deletedIndexes,
  setDeletedIndexes,
}) => {
  const { t, i18n } = useTranslation();

  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: false,
    arrows: false,
    autoplay: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1224,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const slickNext = () => {
    sliderRef.current.slickNext();
  };

  const slickPrev = () => {
    sliderRef.current.slickPrev();
  };
  const handleClick = (index) => {
    setDeletedIndexes((prev) => [...prev, index]);
    const newPreviews = previewsPhotos.filter((_, i) => i !== index);
    setPreveiwsPhotos(newPreviews);
  };
  const inputRef = useRef(null);
  const handleButtonClick = () => inputRef.current.click();
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedPhotos((prevSelected) => [...prevSelected, ...files]);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreveiwsPhotos([...previewsPhotos, ...previews]);
  };
  return (
    <div>
      <p className="text-textColor font-medium mb-3">{t("photoRole")}</p>
      <input
        ref={inputRef}
        className="hidden"
        type="file"
        multiple
        onChange={handleImageChange}
        accept="image/*"
      />
      <div className="relative">
        <div className="flex items-center justify-start mb-2 gap-2">
          <button
            type="button"
            className="cursor-pointer flex items-center justify-center text-white bg-maincolorgreen h-8 w-8 rounded-[50%]"
            onClick={slickNext}
          >
            {i18n.language === "ar" ? (
              <FaChevronRight onClick={slickNext} />
            ) : (
              <FaChevronLeft onClick={slickNext} />
            )}
          </button>
          <button
            type="button"
            className="cursor-pointer flex items-center justify-center text-white bg-maincolorgreen h-8 w-8 rounded-[50%]"
            onClick={slickPrev}
          >
            {i18n.language === "ar" ? (
              <FaChevronLeft onClick={slickPrev} />
            ) : (
              <FaChevronRight onClick={slickPrev} />
            )}
          </button>
        </div>
      </div>
      <Slider
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
        ref={sliderRef}
        {...settings}
        className="bg-[#BDC7BC4D] rounded-[13px] border border-dashed border-[#4D5F65] h-[250px] p-1 mb-5 "
      >
        {previewsPhotos.length > 0 && (
          <div
            className="relative w-[100px] h-[100px] lg:w-[170px] lg:h-[170px] xl:w-[200px] xl:h-[200px] bg-[#BDC7BC4D] border border-dashed cursor-pointer mt-4 px-4"
            onClick={handleButtonClick}
          >
            <FaPlus
              size={30}
              className="text-maincolorgreen  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
            />
          </div>
        )}
        {previewsPhotos.length ? (
          previewsPhotos.map((item, index) => (
            <div
              key={index}
              className="relative w-[100px] h-[100px] lg:w-[170px] lg:h-[170px] xl:w-[200px] xl:h-[200px] px-3 mt-4"
            >
              <img
                src={item}
                alt="preveiw/img"
                className="w-full h-full object-cover"
              />

              <div
                onClick={() => handleClick(index)}
                className="absolute left-0 top-0 w-8 h-8 bg-slate-800 bg-opacity-55 flex items-center justify-center text-white cursor-pointer"
              >
                <IoMdClose size={20} className="text-white" />
              </div>
            </div>
          ))
        ) : (
          <div className="relative w-[100px] h-[100px] lg:w-[170px] lg:h-[170px] xl:w-[200px] xl:h-[200px]  cursor-pointer mt-5 flex items-center justify-center ">
            <img
              src={img}
              alt="img"
              className="cursor-pointer w-[37px] h-[37px] object-contai absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
              onClick={handleButtonClick}
            />
          </div>
        )}
      </Slider>
      {/* <label className="w-full h-[200px] bg-[#ebeeeb] mb-3 rounded-md p-3 px-6 border border-dashed border-textColor flex items-center gap-5 overflow-x-auto">
        <FaPlus
          size={30}
          className="mx-8 cursor-pointer"
          onClick={handleButtonClick}
        />
        {previewsPhotos.map((item, index) => (
          <div key={index} className="relative w-[180px] h-full">
            <img
              src={item}
              alt="preveiw/img"
              className=" w-full h-full object-cover"
            />
            {!isLoading || deletingIndex !== index ? (
              <div
                onClick={() => handleClick(index)}
                className="absolute left-0 top-0 w-8 h-8 bg-slate-600 bg-opacity-55 flex items-center justify-center text-white cursor-pointer"
              >
                <IoMdClose size={20} className="text-white" />
              </div>
            ) : null}
          </div>
        ))}
      </label> */}
    </div>
  );
};

export default RealstateImages;
