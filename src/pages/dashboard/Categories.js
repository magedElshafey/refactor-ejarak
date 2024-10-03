import React, { useState } from "react";
import Spinner from "../../components/common/Spinner";
import { useQuery } from "react-query";
import MainSelect from "../../components/common/inputs/MainSelect";
import { getCategories } from "../../services/get/dashboard/getCategories";
import AddCategoriesBtn from "../../components/dashboard/categories/AddCategoriesBtn";
import AddCategoryForm from "../../components/dashboard/categories/AddCategoryForm";
import EditCategoriesBtn from "../../components/dashboard/categories/EditCategoriesBtn";
import DelteCategoryBtn from "../../components/dashboard/categories/DelteCategoryBtn";
import EditCategoryForm from "../../components/dashboard/categories/EditCategoryForm";
const Categories = () => {
  const { isLoading, data } = useQuery("categories", getCategories);
  const [categoryId, setCategoryId] = useState("");
  const handleCategoryChnage = (opt) => setCategoryId(opt.id);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showEditCategoryForm, setShowEditCategoryForm] = useState(false);
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-8 mt-8">
          <div className="flex items-center gap-4 md:gap-8 lg:gap-12 flex-col md:flex-row">
            <div className="w-full md:w-1/2">
              <MainSelect
                onSelect={handleCategoryChnage}
                label="realstate types"
                options={data?.data?.data}
                value={
                  categoryId
                    ? data?.data?.data?.find((item) => item.id === +categoryId)
                        .name
                    : categoryId
                }
              />
            </div>
            <div className="md:w-1/2 flex items-center gap-3 flex-wrap md:mt-8">
              <AddCategoriesBtn setShowCategoryForm={setShowCategoryForm} />

              <EditCategoriesBtn
                setShowEditCategoryForm={setShowEditCategoryForm}
                id={categoryId}
              />
              <DelteCategoryBtn id={categoryId} setCategoryId={setCategoryId} />
            </div>
          </div>
        </div>
      )}
      <AddCategoryForm
        showCategoryForm={showCategoryForm}
        setShowCategoryForm={setShowCategoryForm}
      />

      <EditCategoryForm
        showEditCategoryForm={showEditCategoryForm}
        setShowEditCategoryForm={setShowEditCategoryForm}
        id={categoryId}
      />
    </>
  );
};

export default Categories;
