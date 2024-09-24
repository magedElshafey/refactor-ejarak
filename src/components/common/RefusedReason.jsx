import React from "react";
import { useTranslation } from "react-i18next";
const RefusedReason = ({ reason, isDeleted }) => {
  const { t } = useTranslation();
  return (
    <>
      {reason ? (
        <div className="w-full p-3 flex items-center  rounded-xl bg-red-200 my-3">
          <p>
            {isDeleted ? t("deleted reason") : t("refusedReason")} : {reason}
          </p>
        </div>
      ) : null}
    </>
  );
};

export default RefusedReason;
