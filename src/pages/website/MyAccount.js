import React, { useState, useRef } from "react";
import AccountDetailsNavbar from "../../components/common/accountDetails/AccountDetailsNavbar";
import MyAccountForm from "../../components/myAccount/MyAccountForm";
import { getMyAccountDetails } from "../../services/get/getMyAccountDetails";
import { useQuery } from "react-query";
import Spinner from "../../components/common/Spinner";
import Swal from "sweetalert2";
// custom hook
import useNumberInput from "../../hooks/validation/useNumberInput";
import useTextInputValidation from "../../hooks/validation/useTextInputValidation";
import useEmailValidation from "../../hooks/validation/useEmailValidation";
import useNationalIdValidation from "../../hooks/validation/useNationalIdValidation";
import usePasswordValidation from "../../hooks/validation/usePasswordValidation";
import UpdatePasswordForm from "../../components/myAccount/UpdatePasswordForm";
const MyAccount = () => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [countryCode, setCountryCode] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [type, setType] = useState("");
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
  const { nationId, setNationId } = useNationalIdValidation();
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
  const { isLoading } = useQuery("account-details", getMyAccountDetails, {
    onSuccess: (data) => {
      if (data?.data?.status) {
        setName(data?.data?.data?.user?.name);
        setPhone(data?.data?.data?.user?.phone.number);
        setCountryCode(data?.data?.data?.user?.phone.country_code);
        setEmail(data?.data?.data?.user?.email.address);
        setPreviewUrl(data?.data?.data?.user?.avatar.original);
        setType(data?.data?.data?.user?.account?.text);
        setNationId(data?.data?.data?.user?.nationalId);
      } else {
      }
    },
  });
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
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-8 mt-8">
          <AccountDetailsNavbar />
          <MyAccountForm
            name={name}
            nameError={nameError}
            handleNameChange={handleNameChange}
            email={email}
            setEmail={setEmail}
            emailError={emailError}
            nationalId={nationId}
            type={type}
            handlePhoneChange={handlePhoneChange}
            phone={phone}
            phoneError={phoneError}
            handlePhotoChange={handlePhotoChange}
            previewUrl={previewUrl}
            profilePhoto={profilePhoto}
            handleRemovePhoto={handleRemovePhoto}
            countryCode={countryCode}
            selectedPhoto={selectedPhoto}
          />
          <UpdatePasswordForm
            password={password}
            passwordError={passwordError}
            handlePasswordChange={handlePasswordChange}
            confirmPassword={confirmPassword}
            confirmPasswordError={confirmPasswordError}
            handleConfrimPasswordChange={handleConfrimPasswordChange}
          />
        </div>
      )}
    </>
  );
};

export default MyAccount;