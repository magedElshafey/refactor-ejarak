import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import MainBtn from "../../components/common/buttons/MainBtn";
import LoadingBtn from "../../components/common/buttons/LoadingBtn";
import OtpInput from "react-otp-input";
import { handleEmailVerfication } from "../../services/post/handleEmailVerfication";
import { handleResendEmailVerficationCode } from "../../services/post/handleResendEmailVerficationCode";
import Swal from "sweetalert2";
import Treaty from "../../components/treaty/Treaty";
const EmailVerfication = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [showTreaty, setShowTreaty] = useState(false);
  const { t } = useTranslation();
  const { isLoading, mutate } = useMutation(handleEmailVerfication, {
    onSuccess: (data) => {
      console.log("data from activation code", data);
      const hasResponseKey = Object.keys(data).includes("response");
      if (!hasResponseKey) {
        if (data.status === 200) {
          Swal.fire({
            icon: "success",
            title: data?.data?.message,
          });
          navigate("/auth/login");
          if (data?.data?.status) {
            setShowTreaty(true);
          } else {
            return;
          }
        }
      } else {
        if (data?.response?.status !== 200) {
          Swal.fire({
            icon: "error",
            title: data?.response?.data?.message,
          });
        }
      }
    },
  });
  const { isLoading: loadingResend, mutate: mutateResend } = useMutation(
    handleResendEmailVerficationCode,
    {
      onSuccess: (data) => {
        if (data?.data?.status) {
          Swal.fire({
            icon: "success",
            title: data?.data?.message,
          });
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
    if (!otp) {
      Swal.fire({
        icon: "error",
        title: t("please fill all fields"),
      });
      return;
    } else {
      const userData = {
        identifier_type: "phone",
        identifier: localStorage.getItem("phone")
          ? JSON.parse(localStorage.getItem("phone"))
          : null,
        code: otp,
      };
      mutate(userData);
    }
  };
  const handleResend = () => {
    const data = {
      identifier_type: "phone",
      identifier: localStorage.getItem("phone")
        ? JSON.parse(localStorage.getItem("phone"))
        : null,
    };
    mutateResend(data);
  };
  return (
    <div>
      <p className="font-bold text-textColor my-5 text-xl">{t("enterOTP")}</p>
      <div
        dir="ltr"
        className="flex items-center justify-center flex-col md:flex-row gap-4 "
      >
        <form>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            inputType={"number"}
            shouldAutoFocus={true}
            skipDefaultStyles={true}
            containerStyle={`gap-1 md:gap-4`}
            inputStyle={`border-2 rounded w-[35px] py-1 text-center`}
            renderInput={(props) => <input {...props} />}
          />
        </form>
      </div>
      {isLoading ? (
        <div className="mt-6">
          <LoadingBtn />
        </div>
      ) : (
        <div className="mt-6">
          <MainBtn action={handleSubmit} type="submit" text={t("verify")} />
        </div>
      )}
      <button
        disabled={loadingResend}
        onClick={handleResend}
        type="button"
        className="font-semibold text-textColor text-base lg:text-md underline"
      >
        {t("resend")}
      </button>
      <Treaty showTreaty={showTreaty} setShowTreaty={setShowTreaty} />
    </div>
  );
};

export default EmailVerfication;
