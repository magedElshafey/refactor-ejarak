import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import MainBtn from "../../common/buttons/MainBtn";
import LoadingBtn from "../../common/buttons/LoadingBtn";
import MainInput from "../../common/inputs/MainInput";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "react-query";
import { IoCloseSharp } from "react-icons/io5";
import { editSubCategory } from "../../../services/post/dashboard/editSubCategory";
const EditSubCategoryForm = ({
  showEditSubCategoryForm,
  setShowEditSubCategoryForm,
  categoryId,
  setCategoryId,
  subCategoryId,
  setSubCategoryId,
  cateogryValue,
  subCategoryValue,
}) => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();
  const [subCategoryName, setSubCategoryName] = useState({
    ar: "",
    en: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubCategoryName((prev) => ({ ...prev, [name]: value }));
  };
  const { isLoading, mutate } = useMutation(
    (v) => editSubCategory(subCategoryId, v),
    {
      onSuccess: (data) => {
        if (data?.data?.status) {
          Swal.fire({
            icon: "success",
            title: data?.data?.message,
          });
          queryClient.invalidateQueries("categories");
          queryClient.invalidateQueries(["sub-categories", categoryId]);
          queryClient.invalidateQueries("featuers");
          setSubCategoryName({
            ar: "",
            en: "",
          });
          setShowEditSubCategoryForm(false);
          setCategoryId("");
          setSubCategoryId("");
        } else {
          Swal.fire({
            icon: "error",
            title: data?.response?.data?.message,
          });
        }
      },
    }
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subCategoryName.ar && !subCategoryName.en) {
      Swal.fire({
        icon: "error",
        title: t("please fill all fields"),
      });
      return;
    } else if (!subCategoryName.ar) {
      Swal.fire({
        icon: "error",
        title: t("sub category name in arabic field is required"),
      });
      return;
    } else if (!subCategoryName.en) {
      Swal.fire({
        icon: "error",
        title: t("sub category name in english field is required"),
      });
    } else {
      const formData = new FormData();
      formData.append("name[ar]", subCategoryName.ar);
      formData.append("name[en]", subCategoryName.en);

      mutate(formData);
    }
  };
  return (
    <div
      className={`duration-300 fixed top-0 ${
        showEditSubCategoryForm ? "left-0" : "left-[-400%]"
      } w-screen h-screen bg-black bg-opacity-35 flex items-center justify-center z-[250]`}
    >
      <div className="container mx-auto px-8">
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-[450px] lg:w-[550px] bg-white p-3 rounded-lg shadow-lg mx-auto"
        >
          <IoCloseSharp
            size={30}
            className="text-red-600 cursor-pointer mb-4"
            onClick={() => setShowEditSubCategoryForm(false)}
          />
          {cateogryValue ? (
            <div className="my-6">
              <MainInput
                type="text"
                name="ar"
                label="category name"
                disabled
                value={cateogryValue}
              />
            </div>
          ) : null}
          {subCategoryValue ? (
            <div className="my-6">
              <MainInput
                type="text"
                name="en"
                label="old sub category name in arabick"
                disabled
                value={subCategoryValue?.ar}
              />
            </div>
          ) : null}
          {subCategoryValue ? (
            <div className="my-6">
              <MainInput
                type="text"
                name="en"
                label="old sub category name in english"
                disabled
                value={subCategoryValue?.en}
              />
            </div>
          ) : null}
          <MainInput
            type="text"
            name="ar"
            label="sub category name in arabic"
            value={subCategoryName.ar}
            onChange={handleChange}
          />

          <div className="my-6">
            <MainInput
              type="text"
              name="en"
              label="sub category name in english"
              value={subCategoryName.en}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-center md:justify-end gap-4 md:gap-6 lg:gap-8">
            <div className="w-[120px]">
              {isLoading ? (
                <LoadingBtn />
              ) : (
                <MainBtn type="submit" text="send" />
              )}
            </div>
            <button
              className="font-semibold"
              type="button"
              onClick={() => setShowEditSubCategoryForm(false)}
            >
              {t("cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSubCategoryForm;
