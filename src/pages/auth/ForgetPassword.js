import React from "react";
import { useTranslation } from "react-i18next";
import useNumberInput from "../../hooks/validation/useNumberInput";
import MobileInput from "../../components/common/inputs/MobileInput";
import MainBtn from "../../components/common/buttons/MainBtn";
import { useMutation } from "react-query";
import LoadingBtn from "../../components/common/buttons/LoadingBtn";
import { handleForgetPassword } from "../../services/post/handleForgetPassword";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const ForgetPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    value: phone,
    error: phoneError,
    handleChange: handlePhoneChange,
    setValue: setPhone,
  } = useNumberInput("");
  const { isLoading, mutate } = useMutation((v) => handleForgetPassword(v), {
    onSuccess: (data) => {
      if (data?.data?.status) {
        Swal.fire({
          icon: "success",
          title: data?.data?.message,
        });
        navigate("/auth/forget-password-code");
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
    if (!phone.trim()) {
      Swal.fire({
        icon: "error",
        title: t("please fill all fields"),
      });
      return;
    } else if (phoneError) {
      Swal.fire({
        icon: "error",
        title: phoneError,
      });
      return;
    } else {
      localStorage.setItem("forgetPhone", JSON.stringify(phone));
      const data = {
        identifier_type: "phone",
        identifier: phone,
      };
      mutate(data);
    }
  };
  return (
    <div>
      <p className="text-[#4D5F65] font-bold text-lg mb-3">{t("forgett")}</p>
      <form onSubmit={handleSubmit}>
        <MobileInput
          value={phone}
          error={phoneError}
          onChange={handlePhoneChange}
        />
        <div className="my-8">
          {isLoading ? <LoadingBtn /> : <MainBtn text="next" />}
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword;
