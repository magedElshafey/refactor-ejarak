import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import MainBtn from "../../../components/common/buttons/MainBtn";
import MainInput from "../../../components/common/inputs/MainInput";
import { useMutation, useQueryClient } from "react-query";
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
import Swal from "sweetalert2";
import useAccountType from "../../../hooks/api/useAccountType";
import { useNavigate } from "react-router-dom";
import upload from "../../../assets/image-.png";
import { CiEdit } from "react-icons/ci";
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
  const { loadingAccountType, accountType, error } = useAccountType();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setSelectedPhoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
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
      if (selectedPhoto) formData.append("photo", selectedPhoto);
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
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8   items-center"
      >
        <div className="w-full border border-dashed border-[#9399A3] p-5 py-12 rounded-lg flex items-center justify-center">
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={inputRef}
            onChange={handlePhotoChange}
          />
          {!previewUrl ? (
            <div className="flex flex-col items-center gap-2">
              <img
                alt="upload-icon"
                src={upload}
                className="max-w-[68px] max-h-[68px] cursor-pointer"
                onClick={() => inputRef.current.click()}
              />
              <p className="text-[#4D5F65]">{t("upload photo")}</p>
            </div>
          ) : (
            <div className="  flex flex-col items-center gap-3">
              <img
                className="max-w-full max-h-[250px]  object-cover"
                src={profilePhoto ? profilePhoto : previewUrl}
                alt="Preview"
              />
              <div className="w-10 h-10 rounded-[50%] bg-maincolorgreen flex items-center justify-center ">
                <CiEdit
                  size={30}
                  className=" cursor-pointer text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    inputRef.current.click();
                  }}
                />
              </div>
            </div>
          )}
        </div>
        <div className="bg-[#f7f7f7] rounded-lg p-4">
          <div className="w-full mb-4">
            <MainInput
              type="text"
              label="name"
              value={name}
              onChange={handleNameChange}
              error={nameError}
            />
          </div>
          <div className="w-full mb-4">
            <MainInput
              type="email"
              label="email"
              placeholder="xx@xxx.xx"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
            />
          </div>
          <div className="w-full mb-4">
            <MobileInput
              value={phone}
              error={phoneError}
              onChange={handlePhoneChange}
            />
          </div>
          <div className="w-full mb-4">
            <MainSelect
              label="userType"
              options={accountType?.data?.data?.account_type}
              onSelect={handleUserTypeChange}
              loading={loadingAccountType}
            />
          </div>
          <div className="w-full mb-4">
            <MainInput
              label="password"
              type="password"
              value={password}
              error={passwordError}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="w-full mb-4">
            <MainInput
              placeholder="1/2xxxxxxxxx"
              label={t("nationalId")}
              value={nationId}
              onChange={handleNationIdChange}
              error={nationError}
            />
          </div>
          <div className=" w-full flex items-center justify-center md:justify-end gap-3">
            <div className="w-[180px]">
              {isLoading ? (
                <LoadingBtn />
              ) : (
                <MainBtn type="submit" text="add user" />
              )}
            </div>
            <button
              onClick={() => navigate(-1)}
              className="font-semibold"
              type="button"
            >
              {t("cancel")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
