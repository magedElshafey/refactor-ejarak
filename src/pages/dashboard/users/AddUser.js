import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import MainBtn from "../../../components/common/buttons/MainBtn";
import MainInput from "../../../components/common/inputs/MainInput";
import { useMutation, useQueryClient, useQuery } from "react-query";
import LoadingBtn from "../../../components/common/buttons/LoadingBtn";
import useTextInputValidation from "../../../hooks/validation/useTextInputValidation";
import useNumberInput from "../../../hooks/validation/useNumberInput";
import MobileInput from "../../../components/common/inputs/MobileInput";
import MainSelect from "../../../components/common/inputs/MainSelect";
import useEmailValidation from "../../../hooks/validation/useEmailValidation";
import { useGlobalContext } from "../../../hooks/GlobalContext";
import useNationalIdValidation from "../../../hooks/validation/useNationalIdValidation";
import usePasswordValidation from "../../../hooks/validation/usePasswordValidation";
import { addUser } from "../../../services/post/dashboard/addUser";
import { getAccountType } from "../../../services/get/dashboard/getAccountType";
import Swal from "sweetalert2";
const AddUser = () => {
  const { t } = useTranslation();
  const { data } = useGlobalContext();
  const queryClient = useQueryClient();
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
  const { isLoading, mutate } = useMutation((v) => addUser(v), {
    onSuccess: (data) => {
      if (data?.data?.status) {
        Swal.fire({
          icon: "success",
          title: data?.data?.message,
        });
        queryClient.invalidateQueries("users");
        setPhone("");
        setName("");
        setEmail("");
        setUserType("");
        setNationId("");
        setPassword("");
      } else {
        Swal.fire({
          icon: "error",
          title: data?.response?.data?.message,
        });
      }
    },
  });
  const { isLoading: loadingAccountType, data: accountType } = useQuery(
    "account-type",
    getAccountType
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !phone.trim() ||
      !name.trim() ||
      !email.trim() ||
      !nationId.trim() ||
      !password.trim()
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
    } else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("phone_country_code", data.countries[0].prefix_code);
      formData.append("account_type", userType);
      formData.append(" nationalId,", nationId);
      // const userData = {
      //   name,
      //   email,
      //   phone,
      //   phone_country_code: data.countries[0].prefix_code,
      //   password,
      //   account_type: userType,
      //   nationalId: nationId,
      // };
      mutate(formData);
    }
  };
  return (
    <div className="container mx-auto px-8 mt-5">
      <p className="text-textColor font-semibold text-md md:text-lg mb-8">
        {t("add user")}
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
      >
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
        <MobileInput
          value={phone}
          error={phoneError}
          onChange={handlePhoneChange}
        />
        <MainSelect
          label="userType"
          options={accountType?.data?.data?.account_type}
          onSelect={handleUserTypeChange}
          loading={loadingAccountType}
        />
        <MainInput
          label="password"
          type="password"
          value={password}
          error={passwordError}
          onChange={handlePasswordChange}
        />
        <MainInput
          placeholder="1/2xxxxxxxxx"
          label={t("nationalId")}
          value={nationId}
          onChange={handleNationIdChange}
          error={nationError}
        />
        <div className="mt-8 w-full flex items-center justify-center md:justify-end gap-3">
          <div className="w-[180px]">
            {isLoading ? (
              <LoadingBtn />
            ) : (
              <MainBtn type="submit" text="add user" />
            )}
          </div>
          <button className="font-semibold" type="button">
            {t("cancel")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
