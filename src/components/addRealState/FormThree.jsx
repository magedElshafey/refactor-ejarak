import React, { useState } from "react";
import UploadSuckFile from "./UploadSuckFile";
import UploadImgaes from "./UploadImgaes";
import UploadVideo from "./UploadVideo";
import { useTranslation } from "react-i18next";
import MainBtn from "../common/buttons/MainBtn";
import Swal from "sweetalert2";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import axios from "axios";
import LoadingBtn from "../common/buttons/LoadingBtn";
import { setProgress, setLoading } from "../../store/uploadSlice";
import { useNavigate } from "react-router-dom";
const FormThree = ({
  selectedImages,
  setSelectedImages,
  previewImages,
  setPreviewImages,
  selectedSuck,
  setSelectedSuck,
  previewSuck,
  setPreviewSuck,
  selectedVideo,
  setSelectedVideo,
  videoPreview,
  setVideoPrview,
  step,
  setStep,
  title,
  category,
  region,
  district,
  address,
  notes,
  instrument_number,
  subCategoryId,
  price,
  age,
  rooms,
  bathRooms,
  elevators,
  area,
  turn,
  paymentType,
  service,
  coordinates,
  furnished,
  kitchen,
  // parkingNumbers,
  // parkingType,
  // airConditions,
}) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [uploadProgress, setUploadProgress] = useState(0);
  const handleBack = () => {
    setStep((prev) => prev - 1);
  };
  const authToken = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null;
  const { isLoading, mutate } = useMutation(
    async (formData) => {
      const response = await axios.post(
        "https://api.ejark.sa/api/v1/realties",
        formData, // formData should be the second parameter
        {
          headers: {
            "Content-Type": "multipart/form-data",
            lang: i18n.language,
            "Accept-Language": i18n.language,
            "Access-Control-Allow-Credentials": true,
            "x-api-key": "0FcBOe75FIFkBkNkA",
            Authorization: authToken ? `Bearer ${authToken}` : null,
          },
          onUploadProgress: (progressEvent) => {
            const total = progressEvent.total;
            const current = progressEvent.loaded;
            setUploadProgress(Math.round((current / total) * 100));
            dispatch(setProgress(Math.round((current / total) * 100)));
          },
        }
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        if (data.status) {
          Swal.fire({
            icon: "success",
            title: data.message,
          });
          navigate(`/website/realstate/${data?.data?.id}`);
        } else {
          Swal.fire({
            icon: "error",
            title: data.message,
          });
          setUploadProgress(0);
        }
      },
      onError: (error) => {
        Swal.fire({
          icon: "error",
          title: error.response?.data?.message || "An error occurred",
        });
      },
    }
  );

  const handleSubmit = () => {
    // const totalImagesSize = selectedImages.reduce(
    //   (acc, image) => acc + image.size,
    //   0
    // );
    if (selectedImages.length && selectedImages.length < 1) {
      Swal.fire({
        icon: "error",
        title: t("At least 1 photos must be uploaded"),
      });
      return;
    } else if (!selectedImages.length) {
      Swal.fire({
        icon: "error",
        title: t("images field is required"),
      });
    } else if (!selectedSuck) {
      Swal.fire({
        icon: "error",
        title: t("instrument file field is required"),
      });
      return;
    } else {
      const formData = new FormData();
      selectedImages.forEach((file) => formData.append("image[]", file));
      if (selectedVideo) {
        formData.append("video", selectedVideo);
      }
      formData.append("instrument_file", selectedSuck);
      formData.append("name", title);
      formData.append("notes", notes);
      formData.append("year_of_construction", age);
      formData.append("area", area);
      formData.append("floor_number", turn);
      formData.append("rooms_count", rooms);
      formData.append("bathrooms_count", bathRooms);
      formData.append("price", price);
      formData.append("lat", coordinates.lat);
      formData.append("lng", coordinates.lng);
      formData.append("region", district);
      formData.append("city_id", region);
      formData.append("service_room", service);
      formData.append("elevator", elevators);
      formData.append("category_id", category);
      formData.append("sub_category_id", subCategoryId);
      formData.append("payment_type_id", paymentType);
      formData.append("instrument_number", instrument_number);
      formData.append("address", address);
      formData.append("furniture", furnished);
      formData.append("kitchen", kitchen);
      // formData.append("air_conditioner", airConditions);
      // formData.append("barking_space", parkingNumbers);
      // formData.append("barking", parkingType);
      mutate(formData);
    }
  };
  return (
    <div>
      <UploadImgaes
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
        previewImages={previewImages}
        setPreviewImages={setPreviewImages}
      />
      <UploadSuckFile
        selectedSuck={selectedSuck}
        setSelectedSuck={setSelectedSuck}
        previewSuck={previewSuck}
        setPreviewSuck={setPreviewSuck}
      />
      <UploadVideo
        selectedVideo={selectedVideo}
        setSelectedVideo={setSelectedVideo}
        videoPreview={videoPreview}
        setVideoPrview={setVideoPrview}
        step={step}
        setStep={setStep}
      />
      <div className="mt-5 w-full flex items-center justify-center lg:justify-end gap-4">
        <button
          type="button"
          onClick={handleBack}
          className=" font-medium text-textColor"
        >
          {t("back")}
        </button>
        <div className="max-w-[150px]">
          {isLoading ? (
            <LoadingBtn />
          ) : (
            <MainBtn
              onClick={handleSubmit}
              disabled={isLoading}
              type="submit"
              text={t("send")}
              action={handleSubmit}
            />
          )}
        </div>
        {isLoading && (
          <div className=" fixed top-0 left-0 bg-black bg-opacity-25 w-full h-full flex items-center">
            <div className="container mx-auto px-8">
              <div className="w-full bg-white shadow-2xl h-1/2 flex items-center p-4 md:w-[400px] lg:w-[550px] mx-auto rounded-lg">
                <div className="w-full">
                  <p className="text-red-600 mb-2">{t("not refresh")}</p>
                  <p className="text-maincolorgreen mb-2">{t("uploading")}</p>
                  <div className="bg-slate-200 w-full h-[8px] rounded-md">
                    <div
                      className="progress bg-maincolorgreen h-[8px] rounded-md"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormThree;
