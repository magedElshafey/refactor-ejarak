import React from "react";
import { useTranslation } from "react-i18next";
import MainInput from "../common/inputs/MainInput";
import { useGlobalContext } from "../../hooks/GlobalContext";
import MainSelect from "../common/inputs/MainSelect";
import { useNavigate } from "react-router-dom";
import AddRealstateMap from "./AddRealstateMap";
import AddRealStateMapSearch from "./AddRealStateMapSearch";
import MainBtn from "../common/buttons/MainBtn";
import Swal from "sweetalert2";
const FormOne = ({
  handleSelect,
  handleChange,
  title,
  category,
  region,
  district,
  address,
  notes,
  searchValue,
  coordinates,
  setCoordinates,
  searchAddress,
  setSearchAddress,
  step,
  setStep,
}) => {
  const { t } = useTranslation();
  const { data } = useGlobalContext();
  const navigate = useNavigate();
  const handleNavigate = () => navigate(-1);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      Swal.fire({
        icon: "error",
        title: t("advertise field are required"),
      });
      return;
    } else if (!category) {
      Swal.fire({
        icon: "error",
        title: t("realstate unit field are required"),
      });
      return;
    } else if (!region) {
      Swal.fire({
        icon: "error",
        title: t("region field are required"),
      });
      return;
    } else if (!district.trim()) {
      Swal.fire({
        icon: "error",
        title: t("district field are required"),
      });
      return;
    } else if (!address.trim()) {
      Swal.fire({
        icon: "error",
        title: t("address field are required"),
      });
      return;
    } else if (!notes.trim()) {
      Swal.fire({
        icon: "error",
        title: t("notes field are required"),
      });
      return;
    } else if (!coordinates) {
      Swal.fire({
        icon: "error",
        title: t("wrong location !!"),
      });
      return;
    } else {
      setStep((prev) => prev + 1);
    }
  };

  return (
    <div>
      <form className="flex flex-col md:flex-row  gap-4 md:gap-6 lg:gap-8">
        <div className="w-full md:w-2/3">
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
              value={
                category
                  ? data.categories.find((item) => item.id === category).name
                  : null
              }
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-6 md:mb-4">
            <MainSelect
              options={data.cities}
              onSelect={handleSelect("region")}
              bg="bg-[#BDC7BC4D]"
              label="region"
              value={
                region
                  ? data.cities.find((item) => item.id === region).name
                  : null
              }
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
            <AddRealStateMapSearch
              label={t("mapSearc")}
              coordinates={coordinates}
              setCoordinates={setCoordinates}
              searchAddress={searchAddress}
              setSearchAddress={setSearchAddress}
            />
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
          <AddRealstateMap
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            setSearchAddress={setSearchAddress}
          />
        </div>
      </form>
      <div className="mt-5 w-full flex items-center justify-center lg:justify-end gap-4">
        <button
          type="button"
          onClick={handleNavigate}
          className=" font-medium text-textColor"
        >
          {t("back")}
        </button>
        <div className="max-w-[150px]">
          <MainBtn type="submit" action={handleSubmit} text={t("next")} />
        </div>
      </div>
    </div>
  );
};

export default FormOne;
