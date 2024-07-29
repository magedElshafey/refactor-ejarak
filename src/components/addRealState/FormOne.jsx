import React from "react";
import { useTranslation } from "react-i18next";
import MainInput from "../common/inputs/MainInput";
import { useGlobalContext } from "../../hooks/GlobalContext";
import MainSelect from "../common/inputs/MainSelect";
const FormOne = () => {
  const { t } = useTranslation();
  const { data } = useGlobalContext();
  return (
    <div>
      <h2
        className={`font-extrabold mb-4 text-center md:text-start  text-black text-xl md:text-2xl
       `}
      >
        {t("Advertise your property")}
      </h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
        <div>
          <p className="font-bold text-textColor text-lg md:text-xl text-center md:text-start mb-4">
            {t("advertiseData")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-6 md:mb-4">
            <MainInput bg="bg-[#BDC7BC4D]" label="adArabicTitle" type="text" />
            <MainSelect
              bg="bg-[#BDC7BC4D]"
              options={data.categories}
              label="type"
            />
            <MainInput bg="bg-[#BDC7BC4D]" />
          </div>
        </div>
        <div></div>
      </form>
    </div>
  );
};

export default FormOne;
