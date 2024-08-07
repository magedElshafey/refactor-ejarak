import React, { useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import { FaStar } from "react-icons/fa";
import newIcon from "../../assets/fire.svg";
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
  return (
    <div>
      <p className="mb-3 font-medium text-base md:text-md lg:text-lg xl:text-xl">
        {t("realstate images")}
      </p>
      {/**slider */}
      <div className="flex items-center justify-start mb-2 gap-2">
        <button
          className=" cursor-pointer flex items-center justify-center text-white  bg-maincolorgreen h-8 w-8 rounded-[50%]"
          onClick={slickNext}
        >
          {i18n.language === "ar" ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
        <button
          className=" cursor-pointer flex items-center justify-center text-white bg-maincolorgreen h-8 w-8 rounded-[50%]"
          onClick={slickPrev}
        >
          {i18n.language === "ar" ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      </div>
      <div className="rounded-md p-3 bg-[#f1efef] w-full">
        <Slider dir="rtl" ref={sliderRef} {...settings}>
          {images?.map((item, index) => (
            <div key={index} className="px-3 relative">
              <img
                alt={item}
                src={item}
                className="w-full h-[250px] object-cover rounded-lg "
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
