import { useMutation } from "react-query";
import { handleLogout } from "../../../services/get/handleLogout";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/auth";
import { useNavigate } from "react-router-dom";
const NafathError = ({ error }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, mutate } = useMutation(handleLogout, {
    onSuccess: (data) => {
      if (data?.data?.status) {
        Swal.fire({
          icon: "success",
          title: data?.data?.message,
        }).then(() => {
          navigate("/");
          dispatch(logout());
          window.location.reload();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: data?.response?.data?.message,
        });
      }
    },
  });
  const handleClick = () => mutate();
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-95 flex items-center justify-center z-50">
      <div className="container mx-auto px-8 md:px-16"></div>
    </div>
  );
};

export default NafathError;
