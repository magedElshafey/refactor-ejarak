import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import MainBtn from "../../../components/common/buttons/MainBtn";
import LoadingBtn from "../../../components/common/buttons/LoadingBtn";
import MainInput from "../../../components/common/inputs/MainInput";
import useNumberInput from "../../../hooks/validation/useNumberInput";
import useTextInputValidation from "../../../hooks/validation/useTextInputValidation";
import { addPackage } from "../../../services/post/dashboard/addPackage";
const AddPackage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const handleNavigate = () => navigate(-1);
  const {
    value: nameAr,
    error: arNameError,
    handleChange: handleNameArChange,
    setValue: setNameAr,
  } = useTextInputValidation();
  const {
    value: nameEn,
    error: enNameError,
    handleChange: handleNameEnChange,
    setValue: setNameEn,
  } = useTextInputValidation();
  const {
    value: price,
    error: priceError,
    handleChange: handlePriceChange,
    setValue: setPrice,
  } = useNumberInput();
  const {
    value: contractsNumber,
    error: contractsNumberError,
    handleChange: handleContractsNumberChange,
    setValue: setContractsNumber,
  } = useNumberInput();
  const [arNotes, setArNotes] = useState("");
  const [enNotes, setEnNotes] = useState("");
  const { isLoading, mutate } = useMutation((v) => addPackage(v), {
    onSuccess: (data) => {
      if (data?.data?.status) {
        Swal.fire({
          icon: "success",
          title: data?.data?.message,
        });
        queryClient.invalidateQueries("packages");
        setNameAr("");
        setNameEn("");
        setPrice("");
        setContractsNumber("");
        setArNotes("");
        setEnNotes("");
      } else {
        Swal.fire({
          icon: "error",
          title: data?.response?.data?.message,
        });
      }
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !nameAr &&
      !nameEn &&
      !price &&
      !contractsNumber &&
      !arNotes &&
      !enNotes
    ) {
      Swal.fire({
        icon: "error",
        title: t("please fill all fields"),
      });
      return;
    } else if (!nameAr) {
      Swal.fire({
        icon: "error",
        title: t("package name in arabic field is required"),
      });
      return;
    } else if (!nameEn) {
      Swal.fire({
        icon: "error",
        title: t("package name in english field is required"),
      });
      return;
    } else if (!price) {
      Swal.fire({
        icon: "error",
        title: t("price package field is required"),
      });
      return;
    } else if (!contractsNumber) {
      Swal.fire({
        icon: "error",
        title: t("contracts number field is required"),
      });
      return;
    } else if (!arNotes) {
      Swal.fire({
        icon: "error",
        title: t("notes in arabic field is required"),
      });
      return;
    } else if (!enNotes) {
      Swal.fire({
        icon: "error",
        title: t("notes in english field is required"),
      });
      return;
    } else if (enNameError) {
      Swal.fire({
        icon: "error",
        title: enNameError,
      });
      return;
    } else if (priceError) {
      Swal.fire({
        icon: "error",
        title: priceError,
      });
    } else if (contractsNumberError) {
      Swal.fire({
        icon: "error",
        title: contractsNumberError,
      });
    } else {
      const formData = new FormData();
      formData.append("name[ar]", nameAr);
      formData.append("name[en]", nameEn);
      formData.append("price", price);
      formData.append("no_contracts", contractsNumber);
      formData.append("notes[ar]", arNotes);
      formData.append("notes[en]", enNotes);
      mutate(formData);
    }
  };
  return (
    <div className="container mx-auto px-8 mt-6">
      <p className="text-md md:text-lg lg:text-xl mb-5 font-semibold text-textColor">
        {t("add package")}
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 "
      >
        <MainInput
          type="text"
          value={nameAr}
          onChange={handleNameArChange}
          label="package name in arabic"
        />

        <MainInput
          type="text"
          value={nameEn}
          onChange={handleNameEnChange}
          error={enNameError}
          label="package name in english"
        />
        <MainInput
          type="number"
          value={price}
          onChange={handlePriceChange}
          error={priceError}
          label="package price"
        />

        <MainInput
          type="number"
          value={contractsNumber}
          onChange={handleContractsNumberChange}
          error={contractsNumberError}
          label="contractors count"
        />
        <MainInput
          type="text"
          value={arNotes}
          onChange={(e) => setArNotes(e.target.value)}
          label="notes in arabic"
        />

        <MainInput
          type="text"
          value={enNotes}
          onChange={(e) => setEnNotes(e.target.value)}
          label="notes in english"
        />
        <div className="w-full flex items-center justify-center md:justify-end gap-8">
          <div className="w-[171px]">
            {isLoading ? (
              <LoadingBtn />
            ) : (
              <MainBtn type="submit" text="add package" />
            )}
          </div>
          <button
            onClick={handleNavigate}
            type="button"
            className="font-semibold"
          >
            {t("cancel")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPackage;
