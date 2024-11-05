import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { IoMdClose } from "react-icons/io";
import { FaPlus, FaChevronRight, FaChevronLeft } from "react-icons/fa";
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
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const updateButtonStates = (current = 0) => {
    const slidesToShow = Math.min(4, previewImages.length + 1);
    setIsPrevDisabled(current === 0);
    setIsNextDisabled(current >= previewImages.length - slidesToShow);
  };
  const settings = {
    dots: false,
    infinite: false,
    arrows: false,
    autoplay: false,
    slidesToShow: Math.min(4, previewImages.length + 1),
    slidesToScroll: Math.min(4, previewImages.length + 1),
    rtl: i18n.language === "ar",
    initialSlide: 0,
    swipeToSlide: true,
    draggable: true,
    afterChange: (current) => updateButtonStates(current),

    responsive: [
      {
        breakpoint: 1224,
        settings: {
          slidesToShow: Math.min(4, previewImages.length + 1),
          slidesToScroll: Math.min(4, previewImages.length + 1),
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: Math.min(3, previewImages.length + 1),
          slidesToScroll: Math.min(3, previewImages.length + 1),
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: Math.min(1, previewImages.length + 1),
          slidesToScroll: Math.min(1, previewImages.length + 1),
        },
      },
    ],
  };

  const handleClick = () => inputRef.current.click();

  const handleFileChange = (event) => {
    const maxSizeInBytes = 20 * 1024 * 1024;
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
      // if (sliderRef.current) {
      //   sliderRef.current.slickGoTo(previewImages.length + files.length);
      // }
    }
  };

  const handleRemovePhoto = (index) => {
    const files = [...selectedImages];
    const previews = [...previewImages];
    files.splice(index, 1);
    previews.splice(index, 1);
    setSelectedImages(files);
    setPreviewImages(previews);
    updateButtonStates();
    // Center remaining slides after removal
    // if (sliderRef.current) {
    //   const newSlideIndex = Math.max(0, Math.min(index, previews.length - 1));
    //   sliderRef.current.slickGoTo(newSlideIndex);
    // }
  };
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
  useEffect(() => {
    updateButtonStates();
  }, [previewImages.length]);
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
      <div className=" relative">
        <div className="flex items-center justify-start mb-2 gap-2">
          <button
            className={`flex items-center justify-center text-white bg-maincolorgreen h-8 w-8 rounded-[50%] ${
              isPrevDisabled
                ? "bg-opacity-35 cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={slickPrev}
            disabled={isPrevDisabled}
          >
            {i18n.language === "ar" ? <FaChevronRight /> : <FaChevronLeft />}
          </button>
          <button
            className={`flex items-center justify-center text-white bg-maincolorgreen h-8 w-8 rounded-[50%] ${
              isNextDisabled
                ? "bg-opacity-35 cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={slickNext}
            disabled={isNextDisabled}
          >
            {i18n.language === "ar" ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
        </div>
      </div>

      <Slider
        ref={sliderRef}
        {...settings}
        className="bg-[#BDC7BC4D] rounded-[13px] border border-dashed border-[#4D5F65] h-[250px] p-3  items-center justify-center px-6 gap-3"
      >
        {previewImages.map((item, index) => (
          <div key={index} className="mx-3">
            <div className="relative  h-[100px] l lg:h-[170px]  xl:h-[200px] p-3 bg-white border mx-4 flex justify-center items-center mt-3">
              <img
                src={item}
                alt="preview/img"
                className="max-w-full max-h-full mx-auto"
              />
              <div className="absolute left-0 top-0 w-7 h-7 bg-slate-800 bg-opacity-55 flex items-center justify-center text-white cursor-pointer">
                <IoMdClose size={20} onClick={() => handleRemovePhoto(index)} />
              </div>
            </div>
          </div>
        ))}

        <div
          className="relative w-[100px] h-[100px] lg:w-[170px] lg:h-[170px] xl:w-[200px] xl:h-[200px] bg-[#BDC7BC4D] border border-dashed cursor-pointer mt-4 px-4 mx-4"
          onClick={handleClick}
        >
          <FaPlus
            size={30}
            className="text-maincolorgreen absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
          />
        </div>
      </Slider>
    </div>
  );
};

export default UploadImgaes;
