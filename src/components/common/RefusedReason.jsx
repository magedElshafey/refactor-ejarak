import React from "react";
import { useTranslation } from "react-i18next";
const RefusedReason = ({ reason }) => {
  const { t } = useTranslation();
  return (
    <>
      {reason ? (
        <div className="w-full p-3 flex items-center  rounded-xl bg-red-200 my-3">
          <p>
            {t("refusedReason")} : {reason}
          </p>
        </div>
      ) : null}
    </>
  );
};

export default RefusedReason;
