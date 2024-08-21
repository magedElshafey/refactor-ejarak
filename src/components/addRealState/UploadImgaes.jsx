import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { IoMdClose } from "react-icons/io";
import { FaPlus, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import img from "../../assets/image-.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const UploadImgaes = ({
  selectedImages,
  setSelectedImages,
  previewImages,
  setPreviewImages,
}) => {
  const { t, i18n } = useTranslation();
  const inputRef = useRef(null);
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

  const handleClick = () => inputRef.current.click();

  const handleFileChange = (event) => {
    const maxSizeInBytes = 20 * 1024 * 1024; // 20 MB
    let totalSizeInBytes = 0;
    const files = Array.from(event.target.files);

    files.forEach((file) => {
      totalSizeInBytes += file.size;
    });

    if (totalSizeInBytes > maxSizeInBytes) {
      Swal.fire({
        icon: "error",
        title: t("limit is 20 MB"),
      });
      return;
    } else {
      setSelectedImages([...selectedImages, ...files]);
      const previews = files.map((file) => URL.createObjectURL(file));
      setPreviewImages([...previewImages, ...previews]);
    }
  };

  const handleRemovePhoto = (index) => {
    const files = [...selectedImages];
    const previews = [...previewImages];
    files.splice(index, 1);
    previews.splice(index, 1);
    setSelectedImages(files);
    setPreviewImages(previews);
  };

  return (
    <div className="mb-5">
      <p className="text-textColor font-medium mb-3">{t("photoRole")}</p>
      <input
        ref={inputRef}
        className="hidden"
        type="file"
        multiple
        onChange={handleFileChange}
        accept="image/*"
      />
      <div className="relative">
        <div className="flex items-center justify-start mb-2 gap-2">
          <button
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
        className="bg-[#BDC7BC4D] rounded-[13px] border border-dashed border-[#4D5F65] h-[250px] p-1 "
      >
        {previewImages.length > 0 && (
          <div
            className="relative w-[100px] h-[100px] lg:w-[170px] lg:h-[170px] xl:w-[200px] xl:h-[200px] bg-[#BDC7BC4D] border border-dashed cursor-pointer mt-4 px-4"
            onClick={handleClick}
          >
            <FaPlus
              size={30}
              className="text-maincolorgreen  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
            />
          </div>
        )}
        {previewImages.length ? (
          previewImages.map((item, index) => (
            <div
              key={index}
              className="relative w-[100px] h-[100px] lg:w-[170px] lg:h-[170px] xl:w-[200px] xl:h-[200px] px-3 mt-4"
            >
              <img
                src={item}
                alt="preveiw/img"
                className="w-full h-full object-cover"
              />
              <div className="absolute left-[10px] top-[5px] w-8 h-8 bg-slate-800 bg-opacity-55 flex items-center justify-center text-white cursor-pointer">
                <IoMdClose size={20} onClick={() => handleRemovePhoto(index)} />
              </div>
            </div>
          ))
        ) : (
          <div className="relative w-[100px] h-[100px] lg:w-[170px] lg:h-[170px] xl:w-[200px] xl:h-[200px]  cursor-pointer mt-5 flex items-center justify-center ">
            <img
              src={img}
              alt="img"
              className="cursor-pointer w-[37px] h-[37px] object-contai absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
              onClick={handleClick}
            />
          </div>
        )}
      </Slider>
    </div>
  );
};

export default UploadImgaes;

/**
 *   {previewImages?.length > 4 ? (
              <div className="flex gap-2 overflow-x-scroll">
                {previewImages.slice(0, 4).map((item, index) => (
                  <div
                    className="flex items-center justify-center gap-2"
                    key={index}
                  >
                    <div className="relative w-[100px] h-[100px] lg:w-[170px] lg:h-[170px] xl:w-[200px] xl:h-[200px] ">
                      <img
                        src={item}
                        alt="preveiw/img"
                        className=" w-full h-full object-cover"
                      />
                      <div className=" absolute left-0 top-0 w-8 h-8 bg-slate-600 bg-opacity-55 flex items-center justify-center text-white cursor-pointer">
                        <IoMdClose
                          size={20}
                          className="text-white"
                          onClick={() => handleRemovePhoto(index)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-center bg-maincolorgreen bg-opacity-35 text-white w-[100px] h-[100px] lg:w-[170px] lg:h-[170px] xl:w-[200px] xl:h-[200px] text-md md:text-lg lg:text-xl xl:text-2xl font-extralight">
                  + {previewImages.length - 4}
                </div>
              </div>
            ) : (
              previewImages.map((item, index) => (
                <div
                  className="flex items-center justify-center  px-1"
                  key={index}
                >
                  <div className="relative w-[100px] h-[100px] lg:w-[170px] lg:h-[170px] xl:w-[200px] xl:h-[200px] mx-3">
                    <img
                      src={item}
                      alt="preveiw/img"
                      className=" w-full h-full object-cover"
                    />
                    <div className=" absolute left-0 top-0 w-8 h-8 bg-slate-600 bg-opacity-55 flex items-center justify-center text-white cursor-pointer">
                      <IoMdClose
                        size={20}
                        className="text-white"
                        onClick={() => handleRemovePhoto(index)}
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
 */
