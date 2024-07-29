import React, { useState } from "react";
import { useTranslation } from "react-i18next";
// custom hook
import useNumberInput from "../../hooks/validation/useNumberInput";
import useTextInputValidation from "../../hooks/validation/useTextInputValidation";
import useEmailValidation from "../../hooks/validation/useEmailValidation";
import useNationalIdValidation from "../../hooks/validation/useNationalIdValidation";
import usePasswordValidation from "../../hooks/validation/usePasswordValidation";
import { useGlobalContext } from "../../hooks/GlobalContext";
import MainInput from "../../components/common/inputs/MainInput";
import MobileInput from "../../components/common/inputs/MobileInput";
import MainSelect from "../../components/common/inputs/MainSelect";
import LoadingBtn from "../../components/common/buttons/LoadingBtn";
import MainBtn from "../../components/common/buttons/MainBtn";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { handleRegester } from "../../services/post/handleRegester";
import { useDispatch } from "react-redux";
import { addToken } from "../../store/auth";
import Swal from "sweetalert2";
const Regester = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    value: phone,
    error: phoneError,
    handleChange: handlePhoneChange,
    setValue: setPhone,
  } = useNumberInput("");
  const {
    value: name,
    error: nameError,
    handleChange: handleNameChange,
    setValue: setName,
  } = useTextInputValidation();
  const { email, setEmail, error: emailError } = useEmailValidation();
  const { data } = useGlobalContext();

  const [userType, setUserType] = useState(data.account_type[1].id);
  const handleUserTypeChange = (e) => setUserType(e.id);
  const { nationId, nationError, setNationId, handleNationIdChange } =
    useNationalIdValidation();
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
  const { isLoading, mutate } = useMutation(handleRegester, {
    onSuccess: (data) => {
      console.log("data", data);
      if (data.status === 201 || data.statusText === "Created") {
        Swal.fire({
          icon: "success",
          title: data?.data?.data?.message,
        });
        dispatch(addToken(data?.data?.data?.token));
        localStorage.setItem(
          "phone",
          JSON.stringify(data?.data?.data?.user.phone.number)
        );
        navigate("/auth/email-verfication");
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
    if (
      !phone.trim() ||
      !name.trim() ||
      !email.trim() ||
      !nationId.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      Swal.fire({
        icon: "error",
        title: t("please fill all fields"),
      });
      return;
    } else if (nameError) {
      Swal.fire({
        icon: "error",
        title: t(nameError),
      });
      return;
    } else if (phoneError) {
      Swal.fire({
        icon: "error",
        title: t(phoneError),
      });
      return;
    } else if (emailError) {
      Swal.fire({
        icon: "error",
        title: t(emailError),
      });
      return;
    } else if (nationError) {
      Swal.fire({
        icon: "error",
        title: t(nationError),
      });
      return;
    } else if (passwordError || confirmPasswordError) {
      Swal.fire({
        icon: "error",
        title: t(passwordError),
      });
      return;
    } else if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: t("password does not match"),
      });
      return;
    } else {
      const userData = {
        name,
        email,
        phone,
        phone_country_code: data.countries[0].prefix_code,
        password,
        account_type: userType,
        nationalId: nationId,
      };
      mutate(userData);
    }
  };
  return (
    <div>
      <p className="text-[#4D5F65] font-bold text-lg mb-3">
        {t("createAccount")}
      </p>
      <p className="text-main  text-sm mb-3">{t("regQuery")}</p>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <MainInput
            type="text"
            label="name"
            value={name}
            onChange={handleNameChange}
            error={nameError}
          />
          <MainInput
            type="email"
            label="email"
            placeholder="xx@xxx.xx"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
          />
        </div>

        <div>
          <MobileInput
            value={phone}
            error={phoneError}
            onChange={handlePhoneChange}
          />
        </div>
        <div className="my-3">
          <MainSelect
            label="userType"
            options={data.account_type}
            value={
              data.account_type?.find((option) => option.id === userType)?.name
            }
            onSelect={handleUserTypeChange}
          />
        </div>
        <div className="my-3">
          <MainInput
            placeholder="1/2xxxxxxxxx"
            label={t("nationalId")}
            value={nationId}
            onChange={handleNationIdChange}
            error={nationError}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <MainInput
            label="password"
            type="password"
            value={password}
            error={passwordError}
            onChange={handlePasswordChange}
          />
          <MainInput
            label="confirm"
            type="password"
            value={confirmPassword}
            error={confirmPasswordError}
            onChange={handleConfrimPasswordChange}
          />
        </div>
        {isLoading ? (
          <LoadingBtn />
        ) : (
          <MainBtn text="createAccount" type="submit" />
        )}
        <div className="flex items-center gap-1 justify-center my-4">
          <p className="text-xs text-textColor">{t("haveNotAccount")}</p>
          <Link
            to="/auth/login"
            className=" underline text-maincolorgreen text-xs"
          >
            {t("login")}
          </Link>
        </div>
        <div className="flex items-center flex-col md:flex-row gap-1 justify-center">
          <p className="text-xs text-textColor">{t("pres")}</p>
          <Link
            to="/website/terms-conditions"
            className=" underline text-[#2B2B2B] text-xs"
          >
            {t("terms")}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Regester;
