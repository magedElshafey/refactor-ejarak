import React, { useState } from "react";
import MainSelect from "../../components/common/inputs/MainSelect";
import { getCategories } from "../../services/get/dashboard/getCategories";
import { useQuery } from "react-query";
import { getSubCategories } from "../../services/get/dashboard/getSubCategories";
import AddSubCategoriesBtn from "../../components/dashboard/subCategories/AddSubCategoriesBtn";
import AddSubCategoryForm from "../../components/dashboard/subCategories/AddSubCategoryForm";
import DeleteSubCategoryBtn from "../../components/dashboard/subCategories/DeleteSubCategoryBtn";
import EditSubCategoryBtn from "../../components/dashboard/subCategories/EditSubCategoryBtn";
import EditSubCategoryForm from "../../components/dashboard/subCategories/EditSubCategoryForm";
const SubCategories = () => {
  const { isLoading, data } = useQuery("categories", getCategories);
  const [categoryId, setCategoryId] = useState("");
  const handleCategoryChnage = (opt) => setCategoryId(opt.id);
  const [subCategoryId, setSubCategoryId] = useState("");
  const handleSubCategoryChnage = (opt) => setSubCategoryId(opt.id);
  const { isLoading: loadingSubCategories, data: subCategories } = useQuery(
    ["sub-categories", categoryId],
    () => getSubCategories(categoryId),
    {
      enabled: !!categoryId, // تفعيل الاستعلام فقط إذا تم تحديد categoryId
    }
  );
  const [showAddSubCategoryForm, setShowAddSubCategoryForm] = useState(false);
  const [showEditSubCategoryForm, setShowEditSubCategoryForm] = useState(false);

  return (
    <div className="container mx-auto px-8 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <MainSelect
          onSelect={handleCategoryChnage}
          label="realstate types"
          options={data?.data?.data || []}
          value={
            categoryId
              ? data?.data?.data?.find((item) => item.id === +categoryId).name
              : categoryId
          }
          loading={isLoading}
        />

        <MainSelect
          onSelect={handleSubCategoryChnage}
          label="unit types"
          options={subCategories?.data?.data || []}
          value={
            subCategoryId
              ? subCategories?.data?.data?.find(
                  (item) => item.id === +subCategoryId
                ).name
              : subCategoryId
          }
          loading={loadingSubCategories}
        />
      </div>
      <div className="w-full flex items-center justify-center flex-wrap gap-6 mt-8">
        <AddSubCategoriesBtn
          setShowAddSubCategoryForm={setShowAddSubCategoryForm}
          categoryId={categoryId}
        />
        <EditSubCategoryBtn
          categoryId={categoryId}
          subCategoryId={subCategoryId}
          setShowEditSubCategoryForm={setShowEditSubCategoryForm}
        />
        <DeleteSubCategoryBtn
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          subCategoryId={subCategoryId}
          setSubCategoryId={setSubCategoryId}
        />
      </div>
      <AddSubCategoryForm
        showAddSubCategoryForm={showAddSubCategoryForm}
        setShowAddSubCategoryForm={setShowAddSubCategoryForm}
        cateogryValue={
          categoryId
            ? data?.data?.data?.find((item) => item.id === +categoryId).name
            : categoryId
        }
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        setSubCategoryId={setSubCategoryId}
      />
      <EditSubCategoryForm
        showEditSubCategoryForm={showEditSubCategoryForm}
        setShowEditSubCategoryForm={setShowEditSubCategoryForm}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        subCategoryId={subCategoryId}
        setSubCategoryId={setSubCategoryId}
        cateogryValue={
          categoryId
            ? data?.data?.data?.find((item) => item.id === +categoryId).name
            : categoryId
        }
        subCategoryValue={
          subCategoryId
            ? subCategories?.data?.data?.find(
                (item) => item.id === +subCategoryId
              ).translations?.name
            : subCategoryId
        }
      />
    </div>
  );
};

export default SubCategories;
