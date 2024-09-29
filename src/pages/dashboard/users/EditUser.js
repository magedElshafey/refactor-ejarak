import React, { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import LoadingBtn from "../../../components/common/buttons/LoadingBtn";
import MainBtn from "../../../components/common/buttons/MainBtn";
import MainSelect from "../../../components/common/inputs/MainSelect";
import MainInput from "../../../components/common/inputs/MainInput";
import useUserDetails from "../../../hooks/api/useUserDetails";
import Spinner from "../../../components/common/Spinner";
import useTextInputValidation from "../../../hooks/validation/useTextInputValidation";
import useNumberInput from "../../../hooks/validation/useNumberInput";
import MobileInput from "../../../components/common/inputs/MobileInput";
import useEmailValidation from "../../../hooks/validation/useEmailValidation";
import useNationalIdValidation from "../../../hooks/validation/useNationalIdValidation";
import usePasswordValidation from "../../../hooks/validation/usePasswordValidation";
import useAccountType from "../../../hooks/api/useAccountType";
import { editUser } from "../../../services/post/dashboard/editUser";
import { useGlobalContext } from "../../../hooks/GlobalContext";
import { CiEdit } from "react-icons/ci";
const EditUser = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: global } = useGlobalContext();
  const params = useParams();
  const queryClient = useQueryClient();
  const handleNavigate = () => navigate(-1);
  const { loadingAccountType, accountType, error } = useAccountType();
  const { isLoading, data } = useUserDetails(params.id);

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
  const [userType, setUserType] = useState("");
  const handleUserTypeChange = (e) => setUserType(e.id);
  const { nationId, nationError, setNationId, handleNationIdChange } =
    useNationalIdValidation();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const inputRef = useRef(null);
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
  const handleRemovePhoto = () => {
    setSelectedPhoto(null);
    setProfilePhoto(null);
    setPreviewUrl(null);
  };
  useEffect(() => {
    if (data?.data?.data) {
      setPhone(data?.data?.data?.phone?.number);
      setName(data?.data?.data?.name);
      setEmail(data?.data?.data?.email?.address);
      setNationId(data?.data?.data?.nationalId);
      setPreviewUrl(data?.data?.data?.avatar.original);
    }
  }, [data]);
  console.log("datta", data?.data?.data);
  const { isLoading: loadingSubmit, mutate } = useMutation(
    (v) => editUser(params.id, v),
    {
      onSuccess: (data) => {
        if (data?.data?.status) {
          Swal.fire({
            icon: "success",
            title: data?.data?.message,
          });
          queryClient.invalidateQueries("users");
          queryClient.invalidateQueries(["user-details", params.id]);
          setPhone("");
          setName("");
          setEmail("");
          setUserType("");
          setNationId("");
        } else {
          Swal.fire({
            icon: "error",
            title: data?.response?.data?.message,
          });
        }
      },
    }
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    if (nameError) {
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
      formData.append("phone_country_code", global?.countries[0]?.prefix_code);
      if (userType) {
        formData.append("account_type", userType);
      }
      formData.append(" nationalId,", nationId);
      if (selectedPhoto) formData.append("photo", selectedPhoto);
      mutate(formData);
      mutate(formData);
    }
  };
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-8 mt-8">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 items-center"
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
                      src=""
                      className="max-w-[68px] max-h-[68px]"
                      onClick={() => inputRef.current.click()}
                    />
                    <p className="text-[#4D5F65]">{t("upload photo")}</p>
                  </div>
                </div>
              ) : (
                <div className=" rounded-lg p-3 border border-dashed border-[#9399A3]  flex flex-col items-center gap-3">
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
              <div className="w-full  mb-4">
                <MainInput
                  type="text"
                  label="name"
                  value={name}
                  onChange={handleNameChange}
                  error={nameError}
                />
              </div>
              <div className="w-full  mb-4">
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
              <div className="w-full  mb-4">
                <MainSelect
                  label="userType"
                  options={accountType?.data?.data?.account_type}
                  onSelect={handleUserTypeChange}
                  loading={loadingAccountType}
                  value={
                    userType
                      ? accountType?.data?.data?.account_type?.find(
                          (item) => item.name === userType
                        )?.name
                      : data?.data?.data?.account?.text
                  }
                />
              </div>
              <div className="w-full  mb-4">
                <MainInput
                  label={t("nationalId")}
                  value={data?.data?.data?.nationalId}
                  disabled
                />
              </div>

              <div className="flex items-center justify-center gap-3 md:gap-7">
                <div className="w-[150px]">
                  {loadingSubmit ? (
                    <LoadingBtn />
                  ) : (
                    <MainBtn text="edit" type="submit" />
                  )}
                </div>
                <button
                  onClick={handleNavigate}
                  type="button"
                  className="font-semibold"
                >
                  {t("cancel")}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EditUser;
