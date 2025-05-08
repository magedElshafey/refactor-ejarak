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
import { request } from "../../services/axios";
import logo from "../../assets/logobglight.png";
const Regester = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [nafazStatus, setNafazStatus] = useState("");
  const [randomNum, setRandomNum] = useState("");
  const [transId, setTransId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
      if (data.status === 201 || data.statusText === "Created") {
        Swal.fire({
          icon: "success",
          title: data?.data?.message,
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
  const handleNafazCheck = async (data) => {
    return await request({
      url: "/nafath/mfa/request",
      method: "POST",
      data,
    });
  };
  const { isLoading: loadingNafaz, mutate: mutateNafaz } = useMutation(
    handleNafazCheck,
    {
      onSuccess: (data) => {
        setShowModal(true);
        if (data?.data?.random) {
          setTransId(data?.data?.transId);
          const random = data?.data?.random;
          setRandomNum(random);
          if (document.hasFocus()) {
            navigator.clipboard
              .writeText(random)
              .then(() => {
                console.log("Random number copied to clipboard:", random);
              })
              .catch((err) => {
                console.error("Failed to copy:", err);
              });
          } else {
            console.warn("Document not focused. Skipping clipboard copy.");
          }
        } else if (data?.data?.error) {
          setError(true);
          setErrorMessage(data?.data?.message);
        } else {
          setError(true);
          setErrorMessage(data?.data?.message);
        }
      },
      onError: (data) => {
        console.log("data from error", data);
        Swal.fire({
          icon: "error",
          title: data?.response?.data?.message,
        });
      },
    }
  );
  const handleClick = () => {
    const data = {
      nationalId: nationId,
    };
    mutateNafaz(data);
  };
  // nafaz status
  const handleNafazStatusCheck = async (data) => {
    return await request({
      url: "/nafath/mfa/request/status",
      method: "POST",
      data,
    });
  };
  const { isLoading: loadingNafazStatus, mutate: mutateNafazStatus } =
    useMutation(handleNafazStatusCheck, {
      onSuccess: (data) => {
        console.log("data from success status", data);
        setNafazStatus(data?.data?.status);
        if (data?.data?.status === "COMPLETED") {
          setShowModal(false);
        }
      },
      onError: (data) => {
        console.log("data from error status", data);
        Swal.fire({
          icon: "error",
          title: data?.response?.data?.message,
        });
      },
    });
  const handleNafazStatusClick = () => {
    const data = {
      nationalId: nationId,
      transId,
      random: randomNum,
    };
    mutateNafazStatus(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !phone.trim() ||
      !name.trim() ||
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
    } else if (nafazStatus !== "COMPLETED") {
      Swal.fire({
        icon: "error",
        title: t("Please check the availability first."),
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
    <>
      <div>
        <p className="text-[#4D5F65] font-bold text-lg mb-3">
          {t("createAccount")}
        </p>
        <p className="text-main  text-sm mb-3">{t("regQuery")}</p>
        <form onSubmit={handleSubmit} className="w-full ">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3"></div>
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
                data.account_type?.find((option) => option.id === userType)
                  ?.name
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
          {nafazStatus === "COMPLETED" ? null : (
            <button
              type="button"
              disabled={loadingNafaz || !nationId}
              onClick={handleClick}
              className="bg-white border border-maincolorgreen rounded-md w-full flex items-center justify-center font-bold py-2 px-4 my-4 disabled:cursor-not-allowed disabled:bg-opacity-10"
            >
              {loadingNafaz ? (
                <div className="w-8 h-8 border-8 border-maincolorgreen border-t-transparent rounded-full animate-spin"></div>
              ) : (
                t("nafaz check")
              )}
            </button>
          )}
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
      {showModal && randomNum && !error ? (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-95 flex items-center justify-center">
          <div className="container mx-auto px-8 md:px-16 flex">
            <div className="w-full md:w-[300px] lg:w-[350px] xl:w-[400px] 2xl:w-[500px] mx-auto bg-white shadow-md border border-maincolorgreen">
              <div className="px-4 py-3">
                <div className="w-full flex justify-center mb-4">
                  <img alt="logo" src={logo} loading="lazy" className="h-12" />
                </div>
                <p className="text-slate-400 flex items-center gap-1 mb-2 justify-center">
                  {t("order number")} :
                  <span className="w-8 h-8 rounded-[50%] flex items-center justify-center bg-maincolorgreen text-white font-medium">
                    {randomNum}
                  </span>
                </p>
                <p className="text-center text-slate-400 mb-4">
                  {t(
                    "The order number has been copied. Please confirm with the Nafath application."
                  )}
                </p>
                {nafazStatus === "EXPIRED" ? (
                  <div className="mb-3">
                    <p className="mb-2 text-red-600 text-xs md:text-sm text-center">
                      {t("Your order number has expired. Please check again.")}
                    </p>
                    <div className="flex justify-center">
                      <button
                        disabled={loadingNafaz}
                        className="font-semibold underline disabled:cursor-not-allowed"
                        onClick={() => {
                          setRandomNum("");
                          handleClick();
                          setNafazStatus("");
                        }}
                      >
                        {t("try again")}
                      </button>
                    </div>
                  </div>
                ) : null}
                {nafazStatus === "REJECTED" ? (
                  <div className="mb-3">
                    <p className="mb-2 text-red-600 text-xs md:text-sm text-center">
                      {t("The wrong number was chosen")}
                    </p>
                    <div className="flex justify-center">
                      <button
                        disabled={loadingNafaz}
                        className="font-semibold underline disabled:cursor-not-allowed"
                        onClick={() => {
                          setRandomNum("");
                          handleClick();
                          setNafazStatus("");
                        }}
                      >
                        {t("try again")}
                      </button>
                    </div>
                  </div>
                ) : null}
                {nafazStatus === "WAITING" ? (
                  <p className="text-maincolorgreen text-xs md:text-sm mb-3 text-center">
                    {t("Waiting for confirmation with Nafath app")}
                  </p>
                ) : null}
              </div>
              <div className="w-full flex items-center justify-center gap-4 flex-wrap p-3">
                <button
                  className="bg-red-600 flex items-center justify-center text-white rounded-md disabled:cursor-not-allowed disabled:bg-opacity-30 py-2 px-4 min-w-[100px]"
                  onClick={() => setShowModal(false)}
                >
                  {t("cancel")}
                </button>
                <button
                  onClick={handleNafazStatusClick}
                  disabled={loadingNafazStatus}
                  className="py-2 px-4 flex items-center justify-center bg-maincolorgreen text-white text-nowrap font-semibold disabled:cursor-not-allowed disabled:bg-opacity-30 disabled:font-normal min-w-[100px]"
                >
                  {loadingNafazStatus ? (
                    <div className="w-8 h-8 border-8 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    t("continue")
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        showModal &&
        error && (
          <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-95 flex items-center justify-center z-50">
            <div className="container mx-auto px-8 md:px-16">
              <div className="w-full md:w-[300px] lg:w-[350px] xl:w-[400px] 2xl:w-[500px] mx-auto bg-white shadow-md border border-maincolorgreen">
                <div className="p-5 w-full flex flex-col items-center justify-center gap-4">
                  {errorMessage ? (
                    <p className="font-medium text-md md:text-lg lg:text-xl xl:text-2xl text-red-600">
                      {errorMessage}
                    </p>
                  ) : null}
                  <p>{t("Please wait a moment and try again.")}</p>
                  <button
                    onClick={() => {
                      setShowModal(false);
                    }}
                    className="bg-red-600 flex items-center justify-center text-white rounded-md disabled:cursor-not-allowed disabled:bg-opacity-30 py-2 px-4 min-w-[100px]"
                  >
                    {t("cancel")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Regester;
