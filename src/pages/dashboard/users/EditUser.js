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
import useAccountType from "../../../hooks/api/useAccountType";
import { editUser } from "../../../services/post/dashboard/editUser";
import { useGlobalContext } from "../../../hooks/GlobalContext";
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

  useEffect(() => {
    if (data?.data?.data) {
      setPhone(data?.data?.data?.phone?.number);
      setName(data?.data?.data?.name);
      setEmail(data?.data?.data?.email?.address);
      setNationId(data?.data?.data?.nationalId);
    }
  }, [data]);
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
      mutate(formData);
    }
  };
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-8 mt-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 md:mb-6">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 md:mb-6">
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
                value={
                  userType
                    ? accountType?.data?.data?.account_type?.find(
                        (item) => item.name === userType
                      )?.name
                    : data?.data?.data?.account?.text
                }
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 md:mb-6">
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
          </form>
        </div>
      )}
    </>
  );
};

export default EditUser;
