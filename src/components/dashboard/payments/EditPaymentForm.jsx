import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import MainBtn from "../../common/buttons/MainBtn";
import LoadingBtn from "../../common/buttons/LoadingBtn";
import MainInput from "../../common/inputs/MainInput";
import Swal from "sweetalert2";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { IoCloseSharp } from "react-icons/io5";
import { getPaymentById } from "../../../services/get/dashboard/getPaymentById";
import { editPayment } from "../../../services/post/dashboard/editPayment";
const EditPaymentForm = ({
  showEditPaymentForm,
  setShowEditPaymentForm,
  id,
  setPaymentId,
}) => {
  const { t } = useTranslation();
  const { data } = useQuery(["payment-details", id], () => getPaymentById(id), {
    enabled: !!id,
  });
  const queryClient = useQueryClient();
  const [paymentName, setPaymentName] = useState({
    ar: "",
    en: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentName((prev) => ({ ...prev, [name]: value }));
  };
  const { isLoading, mutate } = useMutation((v) => editPayment(id, v), {
    onSuccess: (data) => {
      if (data?.data?.status) {
        Swal.fire({
          icon: "success",
          title: data?.data?.message,
        });
        queryClient.invalidateQueries("payments");
        queryClient.invalidateQueries("featuers");
        setPaymentName({
          ar: "",
          en: "",
        });
        setShowEditPaymentForm(false);
        setPaymentId("");
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

  return (
    <div
      className={`duration-300 fixed top-0 ${
        showEditPaymentForm ? "left-0" : "left-[-400%]"
      } w-screen h-screen bg-black bg-opacity-35 flex items-center justify-center z-[250]`}
    >
      <div className="container mx-auto px-8">
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-[450px] lg:w-[550px] bg-white p-3 rounded-lg shadow-lg mx-auto"
        >
          <IoCloseSharp
            size={30}
            className="text-red-600 cursor-pointer mb-4"
            onClick={() => setShowEditPaymentForm(false)}
          />
          <div className="my-6">
            <MainInput
              type="text"
              name="ar"
              label="old payment name in arabic"
              disabled
              value={data?.data?.data?.translations?.name?.ar}
            />
          </div>
          <div className="my-6">
            <MainInput
              type="text"
              name="en"
              label="old payment name in english"
              disabled
              value={data?.data?.data?.translations?.name?.en}
            />
          </div>
          <MainInput
            type="text"
            name="ar"
            label="payment name in arabic"
            value={paymentName.ar}
            onChange={handleChange}
          />

          <div className="my-6">
            <MainInput
              type="text"
              name="en"
              label="payment name in english"
              value={paymentName.en}
              onChange={handleChange}
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
              onClick={() => showEditPaymentForm(false)}
            >
              {t("cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPaymentForm;
