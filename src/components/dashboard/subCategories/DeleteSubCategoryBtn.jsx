// import React from "react";
// import { useTranslation } from "react-i18next";
// import Swal from "sweetalert2";
// import { useMutation, useQueryClient } from "react-query";
// import { deleteSubCategory } from "../../../services/delete/dashboard/deleteSubCategory";
// const DeleteSubCategoryBtn = (
//   categoryId,
//   setCategoryId,
//   subCategoryId,
//   setSubCategoryId
// ) => {
//   const { t } = useTranslation();
//   const queryClient = useQueryClient();
//   const { isLoading, mutate } = useMutation(
//     (v) => deleteSubCategory(subCategoryId, v),
//     {
//       onSuccess: (data) => {
//         if (data?.data?.status) {
//           Swal.fire({
//             icon: "success",
//             title: data?.data?.message,
//           });
//           queryClient.invalidateQueries("categories");
//           queryClient.invalidateQueries(["sub-categories", categoryId]);
//           queryClient.invalidateQueries("featuers");
//           setCategoryId("");
//           setSubCategoryId("");
//         } else {
//           Swal.fire({
//             icon: "error",
//             title: data?.response?.data?.message,
//           });
//         }
//       },
//     }
//   );

//   const handleDelete = () => {
//     if (!categoryId) {
//       Swal.fire({
//         icon: "error",
//         title: t("you need to choose the category first"),
//       });
//       return;
//     } else if (!subCategoryId) {
//       Swal.fire({
//         icon: "error",
//         title: t("you need to choose the sub category first"),
//       });
//       return;
//     } else {
//       Swal.fire({
//         text: t("do you sure you want to remove the sub category"),
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: t("del"),
//         cancelButtonText: t("cancel"),
//       }).then((res) => {
//         if (res.isConfirmed) {
//           const subCategoryData = {};
//           mutate(subCategoryData);
//         } else {
//           return;
//         }
//       });
//     }
//   };
//   return (
//     <button
//       disabled={isLoading}
//       onClick={handleDelete}
//       className="flex items-center justify-center p-3 rounded-md bg-pink font-semibold w-[140px]"
//     >
//       {t("del")}
//     </button>
//   );
// };

// export default DeleteSubCategoryBtn;
import React from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "react-query";
import { deleteSubCategory } from "../../../services/delete/dashboard/deleteSubCategory";

const DeleteSubCategoryBtn = ({
  categoryId,
  setCategoryId,
  subCategoryId,
  setSubCategoryId,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  // استخدام useMutation لحذف الفئة الفرعية
  const { isLoading, mutate } = useMutation(
    () => deleteSubCategory(subCategoryId),
    {
      onSuccess: (data) => {
        if (data?.data?.status) {
          Swal.fire({
            icon: "success",
            title: data?.data?.message,
          });
          // إعادة تحميل البيانات بعد الحذف
          queryClient.invalidateQueries("categories");
          queryClient.invalidateQueries(["sub-categories", categoryId]);
          queryClient.invalidateQueries("featuers");
          setCategoryId("");
          setSubCategoryId("");
        } else {
          Swal.fire({
            icon: "error",
            title: data?.response?.data?.message,
          });
        }
      },
      onError: (error) => {
        Swal.fire({
          icon: "error",
          title: error?.response?.data?.message || t("error_occurred"),
        });
      },
    }
  );

  const handleDelete = () => {
    // التحقق من إدخال الفئة والفئة الفرعية
    if (!categoryId) {
      Swal.fire({
        icon: "error",
        title: t("you need to choose the category first"),
      });
      return;
    }

    if (!subCategoryId) {
      Swal.fire({
        icon: "error",
        title: t("you need to choose the sub category first"),
      });
      return;
    }

    // التأكيد على عملية الحذف
    Swal.fire({
      text: t("do you sure you want to remove the sub category"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("del"),
      cancelButtonText: t("cancel"),
    }).then((res) => {
      if (res.isConfirmed) {
        // تنفيذ الحذف
        mutate();
      }
    });
  };

  return (
    <button
      disabled={isLoading}
      onClick={handleDelete}
      className="flex items-center justify-center p-3 rounded-md bg-pink font-semibold w-[140px]"
    >
      {t("del")}
    </button>
  );
};

export default DeleteSubCategoryBtn;
