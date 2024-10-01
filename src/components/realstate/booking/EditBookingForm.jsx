import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import MainBtn from "../../common/buttons/MainBtn";
import LoadingBtn from "../../common/buttons/LoadingBtn";
import MainInput from "../../common/inputs/MainInput";
import Swal from "sweetalert2";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { IoCloseSharp } from "react-icons/io5";
import { editBookingReason } from "../../../services/post/dashboard/editBookingReasons";
import { getBookingById } from "../../../services/get/dashboard/getBookingById";
const EditBookingForm = ({ showeditReportForm, setShoweditReportForm, id }) => {
  const { t } = useTranslation();
  const { data } = useQuery(["report-details", id], () => getBookingById(id), {
    enabled: !!id,
  });
  const queryClient = useQueryClient();
  const [reportName, setReportName] = useState({
    ar: "",
    en: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReportName((prev) => ({ ...prev, [name]: value }));
  };
  const { isLoading, mutate } = useMutation((v) => editBookingReason(id, v), {
    onSuccess: (data) => {
      if (data?.data?.status) {
        Swal.fire({
          icon: "success",
          title: data?.data?.message,
        });
        queryClient.invalidateQueries("booking-refused-reasons");
        setReportName({
          ar: "",
          en: "",
        });
        setShoweditReportForm(false);
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
    if (!reportName.ar && !reportName.en) {
      Swal.fire({
        icon: "error",
        title: t("please fill all fields"),
      });
      return;
    } else if (!reportName.ar) {
      Swal.fire({
        icon: "error",
        title: t("report name in arabic field is required"),
      });
      return;
    } else if (!reportName.en) {
      Swal.fire({
        icon: "error",
        title: t("report name in english field is required"),
      });
    } else {
      const formData = new FormData();
      formData.append("name[ar]", reportName.ar);
      formData.append("name[en]", reportName.en);

      mutate(formData);
    }
  };
  return (
    <div
      className={`duration-300 fixed top-0 ${
        showeditReportForm ? "left-0" : "left-[-400%]"
      } w-screen h-screen bg-black bg-opareport-35 flex items-center justify-center z-[250]`}
    >
      <div className="container mx-auto px-8">
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-[450px] lg:w-[550px] bg-white p-3 rounded-lg shadow-lg mx-auto"
        >
          <IoCloseSharp
            size={30}
            className="text-red-600 cursor-pointer mb-4"
            onClick={() => setShoweditReportForm(false)}
          />
          <div className="my-6">
            <MainInput
              type="text"
              name="ar"
              label="old report name in arabic"
              disabled
              value={data?.data?.data?.translations?.name?.ar}
            />
          </div>
          <div className="my-6">
            <MainInput
              type="text"
              name="en"
              label="old report name in english"
              disabled
              value={data?.data?.data?.translations?.name?.en}
            />
          </div>
          <MainInput
            type="text"
            name="ar"
            label="report name in arabic"
            value={reportName.ar}
            onChange={handleChange}
          />

          <div className="my-6">
            <MainInput
              type="text"
              name="en"
              label="report name in english"
              value={reportName.en}
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
              onClick={() => setShoweditReportForm(false)}
            >
              {t("cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookingForm;
