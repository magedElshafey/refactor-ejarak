import React from "react";
import MainInput from "../common/inputs/MainInput";
import MainSelect from "../common/inputs/MainSelect";

import MainBtn from "../common/buttons/MainBtn";
import Swal from "sweetalert2";
import {
  elevatorsAr,
  elevatorsEn,
  furnishedOptionsAr,
  furnishedOptionsEn,
  parkingTypeAr,
  parkingTypeEn,
} from "../../data/data";
import { useTranslation } from "react-i18next";
const FormTwo = ({
  setStep,
  handleSelect,
  handleChange,

  selectedCategory,
  subCategoryId,
  price,
  age,
  rooms,
  bathRooms,
  elevators,
  area,
  turn,
  paymentTypesOpt,
  paymentType,
  service,
  furnished,
  kitchen,
  parkingNumbers,
  parkingType,
  airConditions,
  instrument_number,
  instrumentNumError,
  handleChangeInstrumentNum,
}) => {
  const { i18n, t } = useTranslation();
  const handleBack = () => {
    setStep((prev) => prev - 1);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!instrument_number.trim()) {
      Swal.fire({
        icon: "error",
        title: t("instrument number file field is required"),
      });
      return;
    } else if (!subCategoryId) {
      Swal.fire({
        icon: "error",
        title: t("subcategory field is required"),
      });
      return;
    } else if (!price.trim()) {
      Swal.fire({
        icon: "error",
        title: t("price field is required"),
      });
      return;
    } else if (!age.trim()) {
      Swal.fire({
        icon: "error",
        title: t("age field is required"),
      });
      return;
    } else if (!rooms.trim()) {
      Swal.fire({
        icon: "error",
        title: t("rooms field is required"),
      });
      return;
    } else if (!bathRooms.trim()) {
      Swal.fire({
        icon: "error",
        title: t("bathRooms field is required"),
      });
      return;
    } else if (elevators === "") {
      Swal.fire({
        icon: "error",
        title: t("elevators field is required"),
      });
      return;
    } else if (furnished === "") {
      Swal.fire({
        icon: "error",
        title: t("furnished field is required"),
      });
      return;
    } else if (kitchen === "") {
      Swal.fire({
        icon: "error",
        title: t("kitchen field is required"),
      });
      return;
    } else if (parkingNumbers === "") {
      Swal.fire({
        icon: "error",
        title: t("parkingNumbers field is required"),
      });
      return;
    } else if (parkingNumbers > 0 && parkingType === "") {
      Swal.fire({
        icon: "error",
        title: t("parkingType field is required"),
      });
      return;
    } else if (!area.trim()) {
      Swal.fire({
        icon: "error",
        title: t("area field is required"),
      });
      return;
    } else if (airConditions === "") {
      Swal.fire({
        icon: "error",
        title: t("airConditions field is required"),
      });
      return;
    } else if (!turn.trim()) {
      Swal.fire({
        icon: "error",
        title: t("turn field is required"),
      });
      return;
    } else if (!paymentType) {
      Swal.fire({
        icon: "error",
        title: t("payment type field is required"),
      });
      return;
    } else if (!service.trim()) {
      Swal.fire({
        icon: "error",
        title: t("service field is required"),
      });
      return;
    } else if (instrumentNumError) {
      Swal.fire({
        icon: "error",
        title: instrumentNumError,
      });
      return;
    } else {
      setStep((prev) => prev + 1);
    }
  };
  return (
    <>
      <form className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        <MainInput
          label="suckNum"
          bg="bg-[#BDC7BC4D]"
          error={instrumentNumError}
          type="number"
          value={instrument_number}
          onChange={handleChangeInstrumentNum}
        />
        <MainSelect
          label="unit"
          bg="bg-[#BDC7BC4D]"
          options={selectedCategory.categories}
          onSelect={handleSelect("subCategoryId")}
          value={
            subCategoryId
              ? selectedCategory.categories.find(
                  (item) => item.id === subCategoryId
                ).name
              : null
          }
        />
        <MainInput
          label="pricee"
          bg="bg-[#BDC7BC4D]"
          type="number"
          value={price}
          onChange={handleChange("price")}
          min={1}
        />
        <MainInput
          min={1}
          label="age"
          bg="bg-[#BDC7BC4D]"
          type="number"
          value={age}
          onChange={handleChange("age")}
        />
        <MainInput
          min={1}
          label="rooms"
          bg="bg-[#BDC7BC4D]"
          type="number"
          value={rooms}
          onChange={handleChange("rooms")}
        />
        <MainInput
          min={1}
          label="bathRooms"
          bg="bg-[#BDC7BC4D]"
          type="number"
          value={bathRooms}
          onChange={handleChange("bathRooms")}
        />
        <MainSelect
          label="Furnished"
          bg="bg-[#BDC7BC4D]"
          onSelect={handleSelect("furnished")}
          options={
            i18n.language === "ar" ? furnishedOptionsAr : furnishedOptionsEn
          }
          value={
            i18n.language === "ar"
              ? furnishedOptionsAr.find((item) => item?.id === furnished)?.name
              : furnishedOptionsEn.find((item) => item?.id === furnished)?.name
          }
        />
        <MainSelect
          label="kitchen"
          bg="bg-[#BDC7BC4D]"
          onSelect={handleSelect("kitchen")}
          options={i18n.language === "ar" ? elevatorsAr : elevatorsEn}
          value={
            i18n.language === "ar"
              ? elevatorsAr.find((item) => item?.id === kitchen)?.name
              : elevatorsEn.find((item) => item?.id === kitchen)?.name
          }
        />
        <MainInput
          min={0}
          label="parkingNumbers"
          bg="bg-[#BDC7BC4D]"
          type="number"
          value={parkingNumbers}
          onChange={handleChange("parkingNumbers")}
        />
        <MainSelect
          label="parkingType"
          bg="bg-[#BDC7BC4D]"
          onSelect={handleSelect("parkingType")}
          options={i18n.language === "ar" ? parkingTypeAr : parkingTypeEn}
          value={
            i18n.language === "ar"
              ? parkingTypeAr.find((item) => item?.id === parkingType)?.name
              : parkingTypeEn.find((item) => item?.id === parkingType)?.name
          }
          disabled={+parkingNumbers === 0}
          disabledTitle={true}
        />
        <MainInput
          min={0}
          label="airConditions"
          bg="bg-[#BDC7BC4D]"
          type="number"
          value={airConditions}
          onChange={handleChange("airConditions")}
        />
        <MainSelect
          label="elevators"
          bg="bg-[#BDC7BC4D]"
          onSelect={handleSelect("elevators")}
          options={i18n.language === "ar" ? elevatorsAr : elevatorsEn}
          value={
            i18n.language === "ar"
              ? elevatorsAr.find((item) => item?.id === elevators)?.name
              : elevatorsEn.find((item) => item?.id === elevators)?.name
          }
        />
        <MainInput
          label="area"
          bg="bg-[#BDC7BC4D]"
          type="number"
          value={area}
          onChange={handleChange("area")}
          min={1}
        />
        <MainInput
          label="turn"
          bg="bg-[#BDC7BC4D]"
          type="number"
          value={turn}
          onChange={handleChange("turn")}
          min={0}
        />
        <MainSelect
          label="methods"
          bg="bg-[#BDC7BC4D]"
          options={paymentTypesOpt}
          onSelect={handleSelect("paymentType")}
          value={
            paymentType
              ? paymentTypesOpt.find((item) => item.id === paymentType).name
              : null
          }
        />
        <MainInput
          label="service"
          bg="bg-[#BDC7BC4D]"
          type="number"
          value={service}
          onChange={handleChange("service")}
          min={0}
        />
      </form>
      <div className="mt-5 w-full flex items-center justify-center lg:justify-end gap-4">
        <button
          type="button"
          onClick={handleBack}
          className=" font-medium text-textColor"
        >
          {t("back")}
        </button>
        <div className="max-w-[150px]">
          <MainBtn type="submit" text={t("next")} action={handleSubmit} />
        </div>
      </div>
    </>
  );
};

export default FormTwo;
