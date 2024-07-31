import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
const UploadImgaes = () => {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const handleFileChange = () => {};
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
    </div>
  );
};

export default UploadImgaes;
