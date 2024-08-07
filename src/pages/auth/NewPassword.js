import React from "react";
import MainBtn from "../../components/common/buttons/MainBtn";
import LoadingBtn from "../../components/common/buttons/LoadingBtn";
import MainInput from "../../components/common/inputs/MainInput";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import usePasswordValidation from "../../hooks/validation/usePasswordValidation";
import { handleNewPassword } from "../../services/post/handleNewPassword";
import Swal from "sweetalert2";
const NewPassword = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    password,
    error: passwordError,
    setPassword,
    handleChange: handlePasswordChange,
  } = usePasswordValidation();
  const {
    password: confirmPassword,
    error: confirmPasswordError,
    setPassword: setConfrim,
    handleChange: handleConfrimPasswordChange,
  } = usePasswordValidation();
  const { isLoading, mutate } = useMutation((v) => handleNewPassword(v), {
    onSuccess: (data) => {
      if (data?.data?.status) {
        Swal.fire({
          icon: "success",
          title: data?.data?.message,
        });
        navigate("/");
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
    if (!password.trim() && !confirmPassword.trim()) {
      Swal.fire({
        icon: "error",
        title: t("please fill all fields"),
      });
      return;
    } else if (passwordError || confirmPasswordError) {
      Swal.fire({
        icon: "error",
        title: passwordError,
      });
      return;
    } else if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: t("donotMatch"),
      });
      return;
    } else {
      const data = {
        identifier_type: "phone",
        identifier: JSON.parse(localStorage.getItem("forgetPhone")) || "",
        code: JSON.parse(localStorage.getItem("resetPasswordCode")) || "",
        password: password,
      };
      mutate(data);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <MainInput
        label="password"
        type="password"
        value={password}
        error={passwordError}
        onChange={handlePasswordChange}
      />
      <div className="my-8">
        <MainInput
          label="confirm"
          type="password"
          value={confirmPassword}
          error={confirmPasswordError}
          onChange={handleConfrimPasswordChange}
        />
      </div>
      {isLoading ? <LoadingBtn /> : <MainBtn type="submit" text="save" />}
    </form>
  );
};

export default NewPassword;
