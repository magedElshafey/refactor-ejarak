import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { IoMdClose } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import img from "../../assets/image-.png";
const UploadImgaes = ({
  selectedImages,
  setSelectedImages,
  previewImages,
  setPreviewImages,
}) => {
  const { t } = useTranslation();
  const inputRef = useRef(null);

  const handleClick = () => inputRef.current.click();
  const handleFileChange = (event) => {
    const maxSizeInBytes = 20 * 1024 * 1024; // 5 MB
    let totlalSizeInBytes = 0;
    const files = Array.from(event.target.files);
    files.forEach((file) => {
      totlalSizeInBytes += file.size;
    });
    if (totlalSizeInBytes > maxSizeInBytes) {
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
      <label className="bg-[#BDC7BC4D] rounded-[13px] border border-dashed border-[#4D5F65] h-[250px] p-1   flex items-center justify-center  overflow-x-auto  gap-2">
        {previewImages.length ? (
          <FaPlus size={20} onClick={handleClick} className="cursor-pointer" />
        ) : null}

        {previewImages.length ? (
          <div className="flex gap-2">
            {previewImages?.length > 4 ? (
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
          </div>
        ) : (
          <img
            src={img}
            alt="img"
            className=" cursor-pointer w-[37px]"
            onClick={handleClick}
          />
        )}
      </label>
    </div>
  );
};

export default UploadImgaes;
