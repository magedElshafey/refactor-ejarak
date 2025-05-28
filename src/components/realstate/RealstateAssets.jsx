import React, { useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import { FaStar } from "react-icons/fa";
import newIcon from "../../assets/fire.svg";
import { IoCloseSharp } from "react-icons/io5";

const RealstateAssets = ({ images, data }) => {
  const { t, i18n } = useTranslation();
  const settings = {
    dots: false,
    infinite: false,
    arrows: false,
    autoplay: true, // Enable autoplay
    slidesToShow: 4,
    verical: false,
    slidesToScroll: 1,
    initialSlide: 0,
    cssEase: "linear",

    verticalSwiping: false,
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
  const sliderRef = useRef(null);
  const slickNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const slickPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };
  const [showImgsModal, setShowImgsModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const handleClick = (index) => {
    setShowImgsModal(true);
    setActiveIndex(index);
  };
  const handleNext = () => {
    if (activeIndex < images.length - 1) {
      setActiveIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };
  return (
    <div>
      <p className="mb-3 font-medium text-base md:text-md lg:text-lg xl:text-xl">
        {t("realstate images")}
      </p>
      {/**slider */}
      <div className="flex items-center justify-start mb-2 gap-2">
        <button
          className=" cursor-pointer flex items-center justify-center text-white  bg-maincolorgreen h-8 w-8 rounded-[50%]"
          onClick={slickPrev}
        >
          {i18n.language === "ar" ? (
            <FaChevronRight onClick={slickPrev} />
          ) : (
            <FaChevronLeft onClick={slickPrev} />
          )}
        </button>
        <button
          className=" cursor-pointer flex items-center justify-center text-white bg-maincolorgreen h-8 w-8 rounded-[50%]"
          onClick={slickNext}
        >
          {i18n.language === "ar" ? (
            <FaChevronLeft onClick={slickNext} />
          ) : (
            <FaChevronRight onClick={slickNext} />
          )}
        </button>
      </div>
      <div className="rounded-md p-3 bg-[#f1efef] w-full">
        <Slider dir="rtl" ref={sliderRef} {...settings}>
          {images?.map((item, index) => (
            <div key={index} className="px-3 relative">
              <img
                alt={item}
                src={item}
                className="w-full h-[250px] object-cover rounded-lg cursor-pointer "
                onClick={() => handleClick(index)}
              />

              {data?.special || data?.year_of_construction <= 2 ? (
                <div
                  className={`rounded-md absolute top-[5px] p-2 min-w-10 h-10 flex items-center justify-center gap-2   bg-white  ${
                    i18n.language === "ar" ? "right-[15px]" : "left-[15px]"
                  }`}
                >
                  {data?.special ? (
                    <FaStar style={{ color: "gold", width: "20px" }} />
                  ) : null}
                  {data?.year_of_construction <= 2 ? (
                    <img
                      alt="special"
                      src={newIcon}
                      style={{ width: "15px" }}
                    />
                  ) : null}
                </div>
              ) : null}
            </div>
          ))}
        </Slider>
      </div>
      <div
        className={`fixed left-0 duration-300 w-screen h-screen flex items-center justify-center bg-black bg-opacity-60 z-[4500] ${
          showImgsModal ? "top-0" : "top-[-300%]"
        }`}
      >
        <div className="flex items-center gap-4 absolute top-1/2 left-5">
          <button
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className="p-2 bg-white rounded-full shadow-lg text-gray-800 hover:bg-gray-200 disabled:bg-gray-400"
          >
            <FaChevronLeft size={20} />
          </button>
        </div>
        <div className="flex flex-col items-center gap-8">
          <div className="bg-white p-5 flex items-center justify-center border-3 rounded-md border-maincolorgreen">
            <img
              alt="title"
              src={images[activeIndex]}
              className="max-h-[500px]"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {images?.map((item, index) => (
              <div key={index} className="px-3 relative">
                <img
                  alt={item}
                  src={item}
                  className="w-[80px] h-[80px] object-contain  cursor-pointer "
                  onClick={() => setActiveIndex(index)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4 absolute top-1/2 right-5">
          <button
            onClick={handleNext}
            disabled={activeIndex === images.length - 1}
            className="p-2 bg-white rounded-full shadow-lg text-gray-800 hover:bg-gray-200 disabled:bg-gray-400"
          >
            <FaChevronRight size={20} />
          </button>
        </div>
        <div
          onClick={() => {
            setShowImgsModal(false);
            setActiveIndex(null);
          }}
          className={`absolute top-5 ${
            i18n.language === "ar" ? "right-5" : "left-5"
          } flex items-center justify-center bg-red-700 text-white cursor-pointer w-8 h-8`}
        >
          <IoCloseSharp size={20} />
        </div>
      </div>
    </div>
  );
};

export default RealstateAssets;
/**
 *    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      <div className="flex flex-col items-center gap-3">
        <img
          alt="realste-name"
          src={images[activeIndex]}
          className="w-full object-cover h-[330px]"
        />
        <div className="flex items-center gap-2 flex-wrap">
          {images?.map((item, index) => (
            <img
              key={index}
              alt="realstate-name"
              src={item}
              className=" w-10 h-10 cursor-pointer"
              onClick={() => handleActiveIndex(index)}
            />
          ))}
        </div>
      </div>
      {video ? (
        <video
          className="w-full h-[330px] object-cover my-8"
          src={video}
          controls
          muted
          autoPlay
          loop
        ></video>
      ) : null}
    </div>
 */
