import React from "react";
import { useTranslation } from "react-i18next";
import { useGlobalContext } from "../../../hooks/GlobalContext";
import { BsBuildingFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import {
  changeCategoryId,
  changeSubCategoryId,
} from "../../../store/filterSlice";
const RealStateCategories = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { data } = useGlobalContext();

  const { categoryId, subCategoryId } = useSelector(
    (state) => state.filterSlice
  );
  const selectedCategory = data?.categories.find(
    (item) => item.id === categoryId
  );

  return (
    <div className="mb-4">
      <h1 className="text-lg text-start  text-black font-semibold my-2">
        {t("ChooseTypeOfState")}
      </h1>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {data?.categories?.map((item, index) => (
          <div
            onClick={() => dispatch(changeCategoryId(item.id))}
            key={index}
            className={`cursor-pointer flex flex-col items-center p-3 rounded-md  font-bold text-md lg:text-lg xl:text-xl duration-300  ${
              categoryId === item.id
                ? "bg-maincolorgreen text-white border-none"
                : " border border-maincolorgreen bg-grayColor text-maincolorgreen"
            }`}
          >
            <p>{item.name}</p>
            <BsBuildingFill size={30} />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4 justify-center ">
        {selectedCategory?.categories?.map((item, index) => (
          <div
            onClick={() => dispatch(changeSubCategoryId(item.id))}
            key={index}
            className={`p-3 rounded-xl flex items-center justify-center  cursor-pointer ${
              subCategoryId.includes(item.id)
                ? "border-none bg-maincolorgreen text-white"
                : "border border-[#7A8499] text-[#7A8499] "
            }`}
          >
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RealStateCategories;
