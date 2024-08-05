import React from "react";
import { useTranslation } from "react-i18next";
const RealstateImages = () => {
  const { t } = useTranslation();
  return (
    <div>
      <p className="text-textColor font-medium mb-3">{t("photoRole")}</p>
      <div className="w-full h-[200px] bg-[#ebeeeb] mb-3 rounded-md p-3 border border-dashed border-textColor flex items-center gap-3 overflow-x-auto"></div>
    </div>
  );
};

export default RealstateImages;
