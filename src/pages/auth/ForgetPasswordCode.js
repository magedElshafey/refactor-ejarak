import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import MainBtn from "../../components/common/buttons/MainBtn";
import { useMutation } from "react-query";
import LoadingBtn from "../../components/common/buttons/LoadingBtn";
import { passwordRecovery } from "../../services/post/passwordRecovery";
import Swal from "sweetalert2";
const ForgetPasswordCode = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [otp, setOtp] = useState("");
  const { isLoading, mutate } = useMutation((v) => passwordRecovery(v), {
    onSuccess: (data) => {
      if (data?.data?.status) {
        Swal.fire({
          icon: "success",
          title: data?.data?.message,
        });
        localStorage.setItem("resetPasswordCode", JSON.stringify(otp));
        navigate("/auth/new-password");
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
    if (!otp) {
      Swal.fire({
        icon: "error",
        title: t("please fill all fields"),
      });
      return;
    } else if (otp.length < 6) {
      return;
    } else {
      const data = {
        identifier_type: "phone",
        identifier: JSON.parse(localStorage.getItem("forgetPhone")) || "",
        code: otp,
      };
      mutate(data);
    }
  };
  return (
    <div>
      <p className="text-[#4D5F65] font-bold text-lg mb-3">{t("forgett")}</p>
      <form
        dir="ltr"
        onSubmit={handleSubmit}
        className="w-full flex justify-center"
      >
        <div>
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
            dir="ltr"
          />
          <div className="my-8">
            {isLoading ? <LoadingBtn /> : <MainBtn text="next" type="submit" />}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgetPasswordCode;
