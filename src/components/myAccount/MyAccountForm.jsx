import React, { useRef } from "react";
import MainInput from "../common/inputs/MainInput";
import MobileInput from "../common/inputs/MobileInput";
import MainSelect from "../common/inputs/MainSelect";
import { useGlobalContext } from "../../hooks/GlobalContext";
import { useTranslation } from "react-i18next";
import upload from "../../assets/image-.png";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import MainBtn from "../common/buttons/MainBtn";
import LoadingBtn from "../common/buttons/LoadingBtn";
import { updateAccount } from "../../services/post/updateAccount";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { login } from "../../store/auth";
import Swal from "sweetalert2";
const MyAccountForm = ({
  name,
  nameError,
  email,
  setEmail,
  emailError,
  nationalId,
  type,
  handlePhoneChange,
  phone,
  phoneError,
  handleNameChange,
  handlePhotoChange,
  previewUrl,
  profilePhoto,
  handleRemovePhoto,
  countryCode,
  selectedPhoto,
}) => {
  const { data } = useGlobalContext();
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { isLoading, mutate } = useMutation(updateAccount, {
    onSuccess: (data) => {
      if (data?.data?.status) {
        Swal.fire({
          icon: "success",
          title: data?.data?.message,
        });
        dispatch(login(data?.data?.data?.user));
        queryClient.invalidateQueries("account-details");
      } else {
        Swal.fire({
          icon: "error",
          title: data?.response?.data?.message,
        });
      }
    },
  });
  const updateData = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (name) formData.append("name", name);
    if (phone) formData.append("phone", phone);
    formData.append("countryCode", countryCode);
    if (email) formData.append("email", email);
    // if (nationalId) formData.append("nationalId", nationalId);

    if (selectedPhoto) formData.append("photo", selectedPhoto);
    mutate(formData);
  };
  return (
    <form
      onSubmit={updateData}
      className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8"
    >
      <div>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={inputRef}
          onChange={handlePhotoChange}
        />
        {!previewUrl ? (
          <div className=" bg-[#f6f5f5] border border-dashed border-[#9399A3] rounded-[13px] h-[345px] w-full   flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <img
                alt="upload-icon"
                src={upload}
                className="max-w-[68px] max-h-[68px]"
                onClick={() => inputRef.current.click()}
              />
              <p className="text-[#4D5F65]">{t("upload photo")}</p>
            </div>
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
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 md:mb-3">
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 md:mb-3">
          <MainInput
            type="number"
            label="nationalId"
            value={nationalId}
            disabled
          />
          <MainSelect
            disabled={true}
            label="userType"
            options={data.account_type}
            value={type}
          />
        </div>
        <MobileInput
          value={phone}
          onChange={handlePhoneChange}
          error={phoneError}
        />
        <div className="mt-4 md:mt-8  w-full flex justify-center">
          <div className="min-w-[200px]">
            {isLoading ? (
              <LoadingBtn />
            ) : (
              <MainBtn type="submit" text={t("save")} />
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default MyAccountForm;
