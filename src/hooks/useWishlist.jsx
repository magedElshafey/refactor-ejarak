import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { request } from "../services/axios";
import { useTranslation } from "react-i18next";

const useWishlist = (realStateId, dependencies) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isLogin = "true"; // logic to check if the user is logged in

  const handleAddToWishlist = async (id, data) => {
    return await request({
      url: `/favorites/toggle/${id}`,
      method: "POST",
      data,
    });
  };

  const { mutate } = useMutation(
    (data) => handleAddToWishlist(realStateId, data),
    {
      onSuccess: (data) => {
        if (data?.data?.status) {
          Swal.fire({
            title: data.data.message,
            icon: "success",
          });

          queryClient.invalidateQueries(dependencies);
          queryClient.invalidateQueries("favorites");
        }
      },
    }
  );

  const handleClick = () => {
    if (!isLogin) {
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
          navigate("/login");
        } else {
          return;
        }
      });
    } else {
      const data = {};
      mutate(data);
    }
  };

  return { handleClick };
};

export default useWishlist;
