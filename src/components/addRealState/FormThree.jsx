import React from "react";
import UploadSuckFile from "./UploadSuckFile";
import UploadImgaes from "./UploadImgaes";
import UploadVideo from "./UploadVideo";
import { useTranslation } from "react-i18next";
import MainBtn from "../common/buttons/MainBtn";
import Swal from "sweetalert2";
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
}) => {
  const { t } = useTranslation();
  const handleBack = () => {
    setStep((prev) => prev - 1);
  };
  const handleSubmit = () => {
    const totalImagesSize = selectedImages.reduce(
      (acc, image) => acc + image.size,
      0
    );
    if (totalImagesSize > 20 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: t("limit is 20 MB"),
      });
      return;
    } else if (selectedImages.length && selectedImages.length < 4) {
      Swal.fire({
        icon: "error",
        title: t("At least 4 photos must be uploaded"),
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
    } else if (selectedVideo && selectedVideo.size > 20 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: t("limit is 20 MB"),
      });
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
          <MainBtn type="submit" text={t("send")} action={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default FormThree;
