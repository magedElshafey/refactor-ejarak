import React, { useRef, useState } from "react";
import { useGlobalContext } from "../../../hooks/GlobalContext";
import MainSelect from "../../common/inputs/MainSelect";
import useClickOutside from "../../../hooks/useClickOutside";
import { IoIosClose } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { handleRefusedReservation } from "../../../services/post/handleRefusedReservation";
import Swal from "sweetalert2";
const RefusedModal = ({ id, dep, setShowModal, data }) => {
  const { data: global } = useGlobalContext();
  const modalRef = useRef(null);
  const queryClient = useQueryClient();

  const { i18n, t } = useTranslation();
  const [reason, setReason] = useState("");
  const [reasonKey, setReasonKey] = useState("");
  const [anotherReason, setAnotherReason] = useState("");
  const handleSelectReason = (e) => {
    setReason(e.id);
    setReasonKey(e.key);
  };
  const { isLoading, mutate } = useMutation(
    () => handleRefusedReservation(id, { ...data, status: "refused" }),
    {
      onSuccess: (data) => {
        if (data?.data?.status) {
          Swal.fire({
            icon: "success",
            title: data?.data?.message,
          });
          queryClient.invalidateQueries([dep]);
          setShowModal(false);
        } else {
          Swal.fire({
            icon: "error",
            title: data?.response?.data?.message,
          });
        }
      },
    }
  );
  const handleClick = async () => {
    if (!reason && !anotherReason.trim()) {
      Swal.fire({
        icon: "error",
        title: t("please fill all fields"),
      });
      return;
    } else if (reasonKey && !anotherReason.trim()) {
      Swal.fire({
        icon: "error",
        title: t("please fill all fields"),
      });
      return;
    } else {
      const reservationData = {
        rent_refused_reasons_id: reason,
        other_reasons: anotherReason,
        status: "refused",
        accepted_at: data,
      };
      mutate(reservationData);
    }
  };
  return (
    <div className=" fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-35 flex items-center justify-center z-[1000]">
      <div
        ref={modalRef}
        className="bg-white w-[90%] lg:w-[550px] shadow-xl  rounded-xl relative"
      >
        <div
          onClick={() => setShowModal(false)}
          className={`w-6 h-6 z-50 cursor-pointer bg-red-600 rounded-[50%] flex items-center justify-center text-white absolute ${
            i18n.language === "ar" ? "right-0" : "left-0"
          }`}
        >
          <IoIosClose size={20} />
        </div>
        <div className="p-3 mt-8">
          <MainSelect
            options={global?.rent_refused_reason}
            label="refReason"
            onSelect={handleSelectReason}
          />
          <textarea
            value={anotherReason}
            onChange={(e) => setAnotherReason(e.target.value)}
            className={`w-full border border-[#9399A3] focus:outline-none rounded-xl p-3 h-[60px] duration-300 my-4 ${
              reasonKey ? "opacity-100 block" : "opacity-0 hidden"
            }`}
          ></textarea>
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={handleClick}
              disabled={isLoading}
              className="flex items-center justify-center p-2 min-w-[150px] rounded-xl bg-maincolorgreen text-white "
            >
              {t("send")}
            </button>
            <button
              onClick={() => setShowModal(false)}
              className=" text-red-600"
            >
              {t("cancel")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefusedModal;
