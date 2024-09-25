import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { request } from "../services/axios";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const useWishlist = (realStateId, queryKey) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { ejarakLogin } = useSelector((state) => state.authSlice);

  const handleAddToWishlist = async (id) => {
    return await request({
      url: `/favorites/toggle/${id}`,
      method: "POST",
    });
  };

  const { mutate } = useMutation(() => handleAddToWishlist(realStateId), {
    onSuccess: (data) => {
      if (data?.data?.status) {
        Swal.fire({
          title: data.data.message,
          icon: "success",
        });

        queryClient.invalidateQueries(queryKey);
        queryClient.invalidateQueries("favorites");
      }
    },
  });

  const handleClick = () => {
    if (!ejarakLogin) {
      Swal.fire({
        text: t("login_first"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: t("login"),
        cancelButtonText: t("cancel"),
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/auth/login");
        }
      });
    } else {
      mutate();
    }
  };

  return { handleClick };
};

export default useWishlist;

/**the correct add to whishlist is up*/

// const useWishlist = (realstateId, dep) => {
//   const { t } = useTranslation();
//   const queryClient = useQueryClient();
//   const { ejarakLogin } = useSelector((state) => state.authSlice);
//   const navigate = useNavigate();

//   const mutation = useMutation(
//     () =>
//       request({
//         url: `/wishlist/toggle/${realstateId}`,
//         method: "POST",
//       }),
//     {
//       onMutate: async () => {
//         // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
//         await queryClient.cancelQueries([dep]);

//         // Snapshot the previous value
//         const previousRealstates = queryClient.getQueryData([dep]);

//         // Optimistically update to the new value
//         queryClient.setQueryData([dep], (oldData) => {
//           return {
//             ...oldData,
//             data: {
//               ...oldData.data,
//               data: oldData.data.data.map((realstate) =>
//                 realstate.id === realstateId
//                   ? { ...realstate, is_fav: !realstate.is_fav }
//                   : realstate
//               ),
//             },
//           };
//         });

//         // Return a context object with the snapshotted value
//         return { previousRealstates };
//       },
//       onError: (err, variables, context) => {
//         // Rollback to previous value if there's an error
//         queryClient.setQueryData([dep], context.previousRealstates);
//         Swal.fire({
//           icon: "error",
//           title: t("error"),
//           text: t("something went wrong"),
//         });
//       },
//       onSuccess: () => {
//         Swal.fire({
//           icon: "success",
//           title: t("success"),
//           text: t("wishlist updated successfully"),
//         });
//       },
//       onSettled: () => {
//         // Refetch after mutation
//         queryClient.invalidateQueries([dep]);
//       },
//     }
//   );

//   const handleClick = () => {
//     if (ejarakLogin) {
//       mutation.mutate();
//     } else {
//       navigate("/login");
//     }
//   };

//   return { handleClick };
// };

// export default useWishlist;

// import { useMutation, useQueryClient } from "react-query";
// import Swal from "sweetalert2";
// import { request } from "../services/axios";
// import { useTranslation } from "react-i18next";
// import { useSelector } from "react-redux";

// const useWishlist = (realStateId, dep) => {
//   const { t } = useTranslation();
//   const queryClient = useQueryClient();
//   const { ejarakLogin } = useSelector((state) => state.authSlice);

//   const mutation = useMutation(
//     () => {
//       return request({
//         url: `/wishlist/toggle/${realStateId}`,
//         method: "POST",
//       });
//     },
//     {
//       // **تعديل البيانات محليًا بدون إعادة جلب البيانات**
//       onMutate: async () => {
//         await queryClient.cancelQueries(dep);

//         // الحصول على البيانات القديمة
//         const previousData = queryClient.getQueryData(dep);

//         // تحديث الـ cache بشكل مؤقت قبل إرسال الطلب
//         queryClient.setQueryData(dep, (oldData) => {
//           return {
//             ...oldData,
//             data: {
//               ...oldData.data,
//               data: oldData.data.data.map((item) =>
//                 item.id === realStateId
//                   ? { ...item, is_fav: !item.is_fav }
//                   : item
//               ),
//             },
//           };
//         });

//         // لو حدث خطأ، يتم استرجاع البيانات القديمة
//         return { previousData };
//       },
//       onError: (err, variables, context) => {
//         queryClient.setQueryData(dep, context.previousData);
//         Swal.fire({
//           icon: "error",
//           title: t("error"),
//           text: t("something_went_wrong"),
//         });
//       },
//       onSettled: () => {
//         // عدم إعادة جلب البيانات
//         // queryClient.invalidateQueries(dep);
//       },
//       onSuccess: () => {
//         Swal.fire({
//           icon: "success",
//           title: t("success"),
//           text: t("wishlist_updated"),
//         });
//       },
//     }
//   );

//   const handleClick = () => {
//     if (!ejarakLogin) {
//       Swal.fire({
//         icon: "warning",
//         title: t("please_login"),
//       });
//       return;
//     }
//     mutation.mutate();
//   };

//   return { handleClick };
// };

// export default useWishlist;
