import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import MainBtn from "../../common/buttons/MainBtn";
import LoadingBtn from "../../common/buttons/LoadingBtn";
import MainInput from "../../common/inputs/MainInput";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "react-query";
import { IoCloseSharp } from "react-icons/io5";
import { addSubCategories } from "../../../services/post/dashboard/addSubCategories";
const AddSubCategoryForm = ({
  showAddSubCategoryForm,
  setShowAddSubCategoryForm,
  cateogryValue,
  categoryId,
  setCategoryId,
  setSubCategoryId,
}) => {
  const ref = useRef(null);
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [subCategoryName, setSubCategoryName] = useState({
    ar: "",
    en: "",
  });
  const { isLoading, mutate } = useMutation((v) => addSubCategories(v), {
    onSuccess: (data) => {
      if (data?.data?.status) {
        Swal.fire({
          icon: "success",
          title: data?.data?.message,
        });
        queryClient.invalidateQueries("categories");
        queryClient.invalidateQueries("featuers");
        queryClient.invalidateQueries(["sub-categories", categoryId]);
        setSubCategoryName({
          ar: "",
          en: "",
        });
        setCategoryId("");
        setSubCategoryId("");
        setShowAddSubCategoryForm(false);
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
      formData.append("category_id", categoryId);

      mutate(formData);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubCategoryName((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div
      className={`duration-300 fixed top-0 ${
        showAddSubCategoryForm ? "left-0" : "left-[-400%]"
      } w-screen h-screen bg-black bg-opacity-35 flex items-center justify-center z-[250]`}
    >
      <div className="container mx-auto px-8">
        <form
          ref={ref}
          onSubmit={handleSubmit}
          className="w-full md:w-[450px] lg:w-[550px] bg-white p-3 rounded-lg shadow-lg mx-auto"
        >
          <IoCloseSharp
            size={30}
            className="text-red-600 cursor-pointer mb-4"
            onClick={() => setShowAddSubCategoryForm(false)}
          />
          {cateogryValue ? (
            <div className="mb-6">
              <MainInput
                type="text"
                name="en"
                value={cateogryValue}
                label="category name"
                disabled={true}
              />
            </div>
          ) : null}
          <div className="my-6">
            <MainInput
              type="text"
              name="ar"
              value={subCategoryName.ar}
              onChange={handleChange}
              label="sub category name in arabic"
            />
          </div>
          <div className="my-6">
            <MainInput
              type="text"
              name="en"
              value={subCategoryName.en}
              onChange={handleChange}
              label="sub category name in english"
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
              onClick={() => setShowAddSubCategoryForm(false)}
            >
              {t("cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubCategoryForm;
