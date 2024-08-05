import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { useGlobalContext } from "../../../hooks/GlobalContext";
import MainSelect from "../../common/inputs/MainSelect";
import MainBtn from "../../common/buttons/MainBtn";
import LoadingBtn from "../../common/buttons/LoadingBtn";
import { useMutation } from "react-query";
import { reportRealstate } from "../../../services/post/reportRealstate";
import Swal from "sweetalert2";
const ReportForm = ({ showReportForm, setShowReportForm, id }) => {
  const { t } = useTranslation();
  const [reason, setReason] = useState("");
  const [reasonKey, setReasonKey] = useState("");
  const [anotherReason, setAnotherReason] = useState("");
  const handleSelectReason = (e) => {
    setReason(e.id);
    setReasonKey(e.key);
  };
  const { data: global } = useGlobalContext();
  const { isLoading, mutate } = useMutation((v) => reportRealstate(id, v), {
    onSuccess: (data) => {
      if (data?.data?.status) {
        Swal.fire({
          icon: "success",
          title: data?.data?.message,
        });
        setReason("");
        setShowReportForm(false);
        setAnotherReason("");
      } else {
        Swal.fire({
          icon: "error",
          title: data?.response?.data?.message,
        });
        setReason("");
        setShowReportForm(false);
        setAnotherReason("");
      }
    },
  });
  const handleClick = (e) => {
    e.preventDefault();
    if (reason === 5 && anotherReason.trim() === "") {
      Swal.fire({
        icon: "error",
        title: t("please fill all fields"),
      });
      return;
    } else if (!reason) {
      Swal.fire({
        icon: "error",
        title: t("please fill all fields"),
      });
      return;
    } else {
      const userData = {
        report_reason_id: reason,
        another_reason: anotherReason,
      };
      mutate(userData);
    }
  };
  return (
    <div
      className={`fixed w-screen h-screen bg-black bg-opacity-40 top-0 flex items-center justify-center duration-300 ${
        showReportForm ? "left-0" : "left-[-300%]"
      } z-[1000]`}
    >
      <div className="w-full flex justify-center container mx-auto px-8">
        <form
          onSubmit={handleClick}
          className="bg-white p-4 shadow-lg rounded-lg w-full md:w-[400px] lg:w-[550px]"
        >
          <IoMdClose
            size={30}
            className="text-red-600 cursor-pointer mb-5 md:mb-6 lg:mb-8"
            onClick={() => setShowReportForm(false)}
          />
          <p className="text-center font-bold mb-4">{t("report")}</p>

          <MainSelect
            options={global?.report_reasons}
            label="reportReason"
            onSelect={handleSelectReason}
          />
          <textarea
            value={anotherReason}
            onChange={(e) => setAnotherReason(e.target.value)}
            className={`w-full border border-[#9399A3] focus:outline-none rounded-xl p-3 h-[60px] duration-300 my-4 ${
              reasonKey ? "opacity-100 block" : "opacity-0 hidden"
            }`}
          ></textarea>
          <div className="flex items-center justify-center gap-6 md:gap-8 lg:gap-12 mt-8">
            {isLoading ? <LoadingBtn /> : <MainBtn type="submit" text="send" />}

            <button
              onClick={() => setShowReportForm(false)}
              type="button"
              className="font-semibold text-textColor"
            >
              {t("cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportForm;
