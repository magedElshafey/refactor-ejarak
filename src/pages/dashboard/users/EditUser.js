import React, { useState, useEffect } from "react";
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
const EditUser = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();
  const queryClient = useQueryClient();
  const handleNavigate = () => navigate(-1);
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
  const {
    password,
    error: passwordError,
    setPassword,
    handleChange: handlePasswordChange,
  } = usePasswordValidation();
  useEffect(() => {
    if (data?.data?.data) {
      setPhone(data?.data?.data?.phone?.number);
      setName(data?.data?.data?.name);
      setEmail(data?.data?.data?.email?.address);
      setNationId(data?.data?.data?.nationalId);
      //   setUserType(data?.data?.data?.)
    }
  }, []);
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-8 mt-8">
          <form>
            <div className="my-6">
              <MainInput
                type="text"
                label="name"
                value={name}
                onChange={handleNameChange}
                error={nameError}
              />
            </div>
            <div className="my-6">
              <MainInput
                type="email"
                label="email"
                placeholder="xx@xxx.xx"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
              />
            </div>
            <div className="my-6">
              <MobileInput
                value={phone}
                error={phoneError}
                onChange={handlePhoneChange}
              />
            </div>
            {/* <MainSelect
              label="userType"
              options={accountType?.data?.data?.account_type}
              onSelect={handleUserTypeChange}
              loading={loadingAccountType}
            /> */}
            <div className="my-6">
              <MainInput
                label="password"
                type="password"
                value={password}
                error={passwordError}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="my-6">
              <MainInput
                placeholder="1/2xxxxxxxxx"
                label={t("nationalId")}
                value={nationId}
                onChange={handleNationIdChange}
                error={nationError}
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EditUser;
