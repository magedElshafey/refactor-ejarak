import React from "react";
import { useTranslation } from "react-i18next";
import MainInput from "../common/inputs/MainInput";
import { useGlobalContext } from "../../hooks/GlobalContext";
import MainSelect from "../common/inputs/MainSelect";
import SearchOnMap from "../common/map/SearchOnMap";
import MapView from "../common/map/MapView";
import useMap from "../../hooks/useMap";
const FormOne = ({
  handleSelect,
  handleChange,
  title,
  category,
  region,
  district,
  lat,
  lng,
  address,
  notes,
}) => {
  const { t } = useTranslation();
  const { data } = useGlobalContext();
  const { coordinates } = useMap();
  console.log("coordinates from form one", coordinates);
  return (
    <div>
      <h2
        className={`font-extrabold mb-4 text-center md:text-start  text-black text-xl md:text-2xl
       `}
      >
        {t("Advertise your property")}
      </h2>
      <form className="flex flex-col md:flex-row  gap-4 md:gap-6 lg:gap-8">
        <div className="w-full md:w-2/3">
          <p className="font-bold text-textColor text-lg md:text-xl text-center md:text-start mb-4">
            {t("advertiseData")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-6 md:mb-4">
            <MainInput
              bg="bg-[#BDC7BC4D]"
              label="adArabicTitle"
              type="text"
              onChange={handleChange("title")}
              value={title}
            />
            <MainSelect
              bg="bg-[#BDC7BC4D]"
              options={data.categories}
              label="type"
              onSelect={handleSelect("category")}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-6 md:mb-4">
            <MainSelect
              options={data.cities}
              onSelect={handleSelect("region")}
              bg="bg-[#BDC7BC4D]"
              label="region"
            />
            <MainInput
              bg="bg-[#BDC7BC4D]"
              label="district"
              value={district}
              onChange={handleChange("district")}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-textColor text-md font-medium">
              {t("mapSearc")}
            </label>
            <SearchOnMap label={t("mapSearc")} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-6 md:mb-4">
            <MainInput
              bg="bg-[#BDC7BC4D]"
              height="h-[80px]"
              label="allDetails"
              value={address}
              onChange={handleChange("address")}
            />
            <MainInput
              bg="bg-[#BDC7BC4D]"
              height="h-[80px]"
              label="AdArDetails"
              value={notes}
              onChange={handleChange("notes")}
            />
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <MapView />
        </div>
      </form>
    </div>
  );
};

export default FormOne;
