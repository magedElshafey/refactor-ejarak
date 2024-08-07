import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import RefusedModal from "./RefusedModal";
import Swal from "sweetalert2";
const RefusedReservationBtn = ({ id, dep, data }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    Swal.fire({
      text: t("refReq"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("refusedd"),
      cancelButtonText: t("cancel"),
    }).then((result) => {
      if (result.isConfirmed) {
        setShowModal(true);
      } else {
        return;
      }
    });
  };
  return (
    <>
      <button
        onClick={handleShowModal}
        className="flex items-center p-2 md:p-3 rounded-xl justify-center bg-red-500 text-white border border-white duration-300 w-auto md:w-[150px] hover:bg-white hover:text-red-500 hover:border-red-500"
      >
        {t("refusedd")}
      </button>
      {showModal ? (
        <RefusedModal
          id={id}
          dep={dep}
          setShowModal={setShowModal}
          data={data}
        />
      ) : null}
    </>
  );
};

export default RefusedReservationBtn;
