import React from "react";
import { useTranslation } from "react-i18next";
import MainInput from "../common/inputs/MainInput";
import { useMutation } from "react-query";
import { updatePassword } from "../../services/post/updatePassword";
import { logout } from "../../store/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import MainBtn from "../common/buttons/MainBtn";
import LoadingBtn from "../common/buttons/LoadingBtn";
const UpdatePasswordForm = ({
  password,
  passwordError,
  handlePasswordChange,
  confirmPassword,
  confirmPasswordError,
  handleConfrimPasswordChange,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, mutate } = useMutation(updatePassword, {
    onSuccess: (data) => {
      if (data?.data?.status) {
        Swal.fire({
          icon: "success",
          title: data?.data?.message,
        });
        navigate("/");
        dispatch(logout());
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
    const userData = {
      password,
      new_password: confirmPassword,
    };
    mutate(userData);
  };
  return (
    <div className="mt-6 md:mt-8 lg:mt-12">
      <p className="text-xl mb-6 md:mb-8 md:text-2xl lg:text-4xl text-maincolorgreen font-bold text-center ">
        {t("changePassword")}
      </p>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-6 md:mb-8 lg:mb-12"
      >
        <MainInput
          type="password"
          label="old password"
          value={password}
          error={passwordError}
          onChange={handlePasswordChange}
        />
        <MainInput
          type="password"
          label="new password"
          value={confirmPassword}
          onChange={handleConfrimPasswordChange}
          error={confirmPasswordError}
        />
      </form>
      <div className="w-full flex justify-center">
        <div className="min-w-[200px]">
          {isLoading ? (
            <LoadingBtn />
          ) : (
            <MainBtn type="submit" text={t("save")} action={handleSubmit} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdatePasswordForm;
