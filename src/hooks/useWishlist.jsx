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
