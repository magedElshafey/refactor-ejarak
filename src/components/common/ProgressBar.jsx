import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
const ProgressBar = () => {
  const { t } = useTranslation();
  const { progress, isLoading, showMsg, msgType, msg } = useSelector(
    (state) => state.uploadSlice
  );
  return (
    <>
      {!isLoading ? null : (
        <div className="fixed top-0 left-0 bg-white w-full p-3 z-50">
          <p className="mb-0 bg-maincolorgreen">{t("uploading")}</p>
          <div className="bg-slate-200 w-full h-[8px] rounded-md">
            <div
              className="bg-maincolorgreen h-[8px] rounded-md"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProgressBar;
