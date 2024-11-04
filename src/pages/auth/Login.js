//
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import MobileInput from "../../components/common/inputs/MobileInput";
import useNumberInput from "../../hooks/validation/useNumberInput";
import MainInput from "../../components/common/inputs/MainInput";
import { Link, useNavigate } from "react-router-dom";
import MainBtn from "../../components/common/buttons/MainBtn";
import NafazBtn from "../../components/common/buttons/NafazBtn";
import { handleLogin } from "../../services/post/handleLogin";
import { useMutation } from "react-query";
import LoadingBtn from "../../components/common/buttons/LoadingBtn";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { login, addToken } from "../../store/auth";
import usePasswordValidation from "../../hooks/validation/usePasswordValidation";
import { IoMdCheckmark } from "react-icons/io";

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);

  const {
    value: phone,
    error: phoneError,
    handleChange: handlePhoneChange,
    setValue: setPhone,
  } = useNumberInput("");

  const {
    password,
    error: passwordError,
    handleChange: handlePasswordChange,
    setPassword,
  } = usePasswordValidation();

  useEffect(() => {
    const savedPhone = localStorage.getItem("phone");
    const savedPassword = localStorage.getItem("password");

    if (savedPhone && savedPassword) {
      setPhone(savedPhone);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, [setPhone, setPassword]);

  const { isLoading, mutate } = useMutation(handleLogin, {
    onSuccess: (data) => {
      if (data?.data?.status) {
        Swal.fire({
          icon: "success",
          title: data?.data?.message,
        });
        dispatch(login(data?.data?.data?.user));
        dispatch(addToken(data?.data?.data?.token));

        if (rememberMe) {
          localStorage.setItem("phone", phone);
          localStorage.setItem("password", password);
        } else {
          localStorage.removeItem("phone");
          localStorage.removeItem("password");
        }
        navigate("/website/all-realstates");
      } else {
        Swal.fire({
          icon: "error",
          title: data?.response?.data?.message,
        });
      }
      if (data?.response?.data?.data?.credentials_is_correct) {
        navigate("/auth/email-verfication");
      } else {
        return;
      }
    },
  });

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password.trim() || !phone.trim()) {
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
    } else {
      const userData = {
        identifier_type: "phone",
        identifier: phone,
        password,
      };
      mutate(userData);
    }
  };

  return (
    <div>
      <p className="text-[#4D5F65] font-bold text-lg mb-3">{t("login")}</p>
      <p className="text-main text-sm mb-5">{t("loginQuery")}</p>
      <form onSubmit={handleSubmit} className="w-full">
        <MobileInput
          value={phone}
          error={phoneError}
          onChange={handlePhoneChange}
        />
        <MainInput
          label="password"
          type="password"
          placeholder="password"
          value={password}
          onChange={handlePasswordChange}
          error={passwordError}
        />
        <div className="w-full flex items-center justify-between my-4">
          <div
            onClick={handleRememberMeChange}
            className="flex items-center gap-1 cursor-pointer"
          >
            {!rememberMe ? (
              <div className="border w-4 h-4 bg-transparent"></div>
            ) : (
              <div className="border w-4 h-4 flex items-center justify-center bg-maincolorgreen text-white font-bold">
                <IoMdCheckmark size={10} />
              </div>
            )}

            <p>{t("rem")}</p>
          </div>
          <Link
            to="/auth/forget-password"
            className="text-red-500 underline font-medium text-sm"
          >
            {t("forget")}
          </Link>
        </div>
        {isLoading ? <LoadingBtn /> : <MainBtn text="login" type="submit" />}
        <div className="my-4">
          <NafazBtn />
        </div>
        <div className="flex items-center gap-1 justify-center mb-4">
          <p className="text-xs text-textColor">{t("haveAccount")}</p>
          <Link
            to="/auth/regester"
            className="underline text-maincolorgreen text-xs"
          >
            {t("createAccount")}
          </Link>
        </div>
        <div className="flex items-center flex-col md:flex-row gap-1 justify-center">
          <p className="text-xs text-textColor">{t("pres")}</p>
          <Link
            to="/website/terms-conditions"
            className="underline text-[#2B2B2B] text-xs"
          >
            {t("terms")}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
