import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import MainBtn from "../../common/buttons/MainBtn";
import LoadingBtn from "../../common/buttons/LoadingBtn";
import MainInput from "../../common/inputs/MainInput";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "react-query";
import { IoCloseSharp } from "react-icons/io5";
import { addPayment } from "../../../services/post/dashboard/addPayment";
const PaymentForm = ({ showPaymentForm, setShowPaymentForm }) => {
  const ref = useRef(null);
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [paymentName, setPaymentName] = useState({
    ar: "",
    en: "",
  });
  const { isLoading, mutate } = useMutation((v) => addPayment(v), {
    onSuccess: (data) => {
      if (data?.data?.status) {
        Swal.fire({
          icon: "success",
          title: data?.data?.message,
        });
        queryClient.invalidateQueries("payments");
        setPaymentName({
          ar: "",
          en: "",
        });
        setShowPaymentForm(false);
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
    if (!paymentName.ar && !paymentName.en) {
      Swal.fire({
        icon: "error",
        title: t("please fill all fields"),
      });
      return;
    } else if (!paymentName.ar) {
      Swal.fire({
        icon: "error",
        title: t("payment name in arabic field is required"),
      });
      return;
    } else if (!paymentName.en) {
      Swal.fire({
        icon: "error",
        title: t("payment name in english field is required"),
      });
    } else {
      const formData = new FormData();
      formData.append("name[ar]", paymentName.ar);
      formData.append("name[en]", paymentName.en);

      mutate(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentName((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div
      className={`duration-300 fixed top-0 ${
        showPaymentForm ? "left-0" : "left-[-400%]"
      } w-screen h-screen bg-black bg-opacity-35 flex items-center justify-center z-[250]`}
    >
      <div className="container mx-auto px-8">
        <form
          ref={ref}
          onSubmit={handleSubmit}
          className="w-full md:w-[450px] lg:w-[550px] bg-white p-3 rounded-lg shadow-lg mx-auto"
        >
          <IoCloseSharp
            size={30}
            className="text-red-600 cursor-pointer mb-4"
            onClick={() => setShowPaymentForm(false)}
          />
          <MainInput
            type="text"
            name="ar"
            value={paymentName.ar}
            onChange={handleChange}
            label="payment name in arabic"
          />

          <div className="my-6">
            <MainInput
              type="text"
              name="en"
              value={paymentName.en}
              onChange={handleChange}
              label="payment name in english"
            />
          </div>
          <div className="flex justify-center md:justify-end gap-4 md:gap-6 lg:gap-8">
            <div className="w-[120px]">
              {isLoading ? (
                <LoadingBtn />
              ) : (
                <MainBtn type="submit" text="send" />
              )}
            </div>
            <button
              className="font-semibold"
              type="button"
              onClick={() => setShowPaymentForm(false)}
            >
              {t("cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
