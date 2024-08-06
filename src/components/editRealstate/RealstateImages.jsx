import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IoMdClose } from "react-icons/io";
import { deleteRealstateImages } from "../../services/delete/deleteRealstateImages";
import { useMutation, useQueryClient } from "react-query";
import Swal from "sweetalert2";
import { FaPlus } from "react-icons/fa";
const RealstateImages = ({
  previewsPhotos,
  setPreveiwsPhotos,
  selectedPhotos,
  setSelectedPhotos,
  realstateId,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [deletingIndex, setDeletingIndex] = useState(null);
  const { isLoading, mutate } = useMutation(
    (v) => deleteRealstateImages(realstateId, v),
    {
      onSuccess: (data) => {
        if (data?.data?.status) {
          Swal.fire({
            icon: "success",
            title: data?.data?.message,
          });
          queryClient.invalidateQueries(["realstate-details", realstateId]);
        } else {
          Swal.fire({
            icon: "error",
            title: data?.response?.data?.message,
          });
        }
      },
    }
  );
  const handleClick = (data) => {
    setDeletingIndex(data);
    const userData = {
      indexes: [data],
    };
    mutate(userData);
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
      <label className="w-full h-[200px] bg-[#ebeeeb] mb-3 rounded-md p-3 px-6 border border-dashed border-textColor flex items-center gap-5 overflow-x-auto">
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
      </label>
    </div>
  );
};

export default RealstateImages;
