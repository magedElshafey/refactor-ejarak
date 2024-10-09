import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import useClickOutside from "../../../hooks/useClickOutside";
import { IoMdClose } from "react-icons/io";
import MainSelect from "../../common/inputs/MainSelect";
import { useGlobalContext } from "../../../hooks/GlobalContext";
import MainBtn from "../../common/buttons/MainBtn";
import { useMutation } from "react-query";
import { bookingRealstate } from "../../../services/post/bookingRealstate";
import Swal from "sweetalert2";
import LoadingBtn from "../../common/buttons/LoadingBtn";
import useNumberInput from "../../../hooks/validation/useNumberInput";
const BookingForm = ({ showBookingForm, setShowBookingForm, data }) => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const [startDate, setStartDate] = useState("");
  const [error, setError] = useState("");
  const [convertedDate, setConvertedDate] = useState("");
  const {
    value: period,
    error: periodError,
    handleChange: handlePeriodChange,
    setValue: setPeriod,
  } = useNumberInput("");
  const {
    value: familyNum,
    error: familyNumError,
    handleChange: handleFamilyNumberChange,
    setValue: setFamilyNum,
  } = useNumberInput("");
  const { data: global } = useGlobalContext();
  const [userType, setUserType] = useState(global.account_type[0].id);

  const handleStartDateChange = (e) => {
    const selectedDate = e.target.value;
    const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

    if (selectedDate < currentDate) {
      setError(t("dateError"));
    } else {
      setError("");
      setStartDate(selectedDate);
    }
  };

  useEffect(() => {
    if (startDate) {
      const [month, day, year] = startDate.split("/");
      const convertedDateString = `${day}-${month}-${year}`;
      setConvertedDate(convertedDateString);
    } else {
      setConvertedDate("");
    }
  }, [startDate]);

  const handleUserTypeChange = (e) => setUserType(e.id);
  const { isLoading, mutate } = useMutation((v) => bookingRealstate(v), {
    onSuccess: (data) => {
      if (data?.data?.status) {
        Swal.fire({
          icon: "success",
          title: data?.data?.message,
        });
        setShowBookingForm(false);
        setPeriod("");
        setFamilyNum("");
        setUserType(userType?.[0]?.id);
        setStartDate("");
      } else {
        Swal.fire({
          icon: "error",
          title: data?.response?.data?.message,
        });
        setShowBookingForm(false);
        setPeriod("");
        setFamilyNum("");
        setUserType(userType?.[0]?.id);
        setStartDate("");
      }
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!period.trim() || !userType || !startDate.trim()) {
      Swal.fire({
        icon: "error",
        title: t("please fill all fields"),
      });
      return;
    } else if (error) {
      Swal.fire({
        icon: "error",
        title: error,
      });
      return;
    } else if (periodError) {
      Swal.fire({
        icon: "error",
        title: periodError,
      });
      return;
    } else {
      const v = {
        realty_id: data.id,
        owner_id: data.user.id,
        contract_period: period,
        family_number: familyNum,
        contract_fee_payer: userType,
        contract_start_date: startDate,
      };
      mutate(v);
    }
  };
  return (
    <div
      className={`fixed w-screen h-screen bg-black bg-opacity-40 top-0 flex items-center justify-center duration-300 ${
        showBookingForm ? "left-0" : "left-[-300%]"
      } z-[1000]`}
    >
      <div className="w-full flex justify-center container mx-auto px-8">
        <form
          onSubmit={handleSubmit}
          ref={ref}
          className="bg-white p-4 shadow-lg rounded-lg w-full md:w-[400px] lg:w-[550px]"
        >
          <IoMdClose
            size={30}
            className="text-red-600 cursor-pointer mb-5 md:mb-6 lg:mb-8"
            onClick={() => setShowBookingForm(false)}
          />
          <div className="mb-3 md:mb-4 lg:mb-5">
            <label
              htmlFor="startDate"
              className="text-textColor font-semibold block mb-1"
            >
              {t("startDate")}
            </label>

            <input
              value={startDate}
              onChange={handleStartDateChange}
              id="startDate"
              type="date"
              className="w-full border border-gray-300 focus:outline-none p-2 rounded-md"
              required
            />
            {error ? <div className="my-2 text-red-500">{error}</div> : null}
          </div>
          <div className="mb-3 md:mb-4 lg:mb-5">
            <label
              htmlFor="period"
              className="text-textColor font-semibold block mb-1"
            >
              {t("period")}
            </label>

            <input
              value={period}
              onChange={handlePeriodChange}
              id="period"
              type="number"
              className="w-full border border-gray-300 focus:outline-none p-2 rounded-md"
              required
            />
            {periodError ? (
              <div className="my-2 text-red-500">{periodError}</div>
            ) : null}
          </div>
          {data?.category?.id === 2 ? (
            <div className="mb-3 md:mb-4 lg:mb-5">
              <label
                htmlFor="familyNum"
                className="text-textColor font-semibold block mb-1"
              >
                {t("familyNum")}
              </label>
              <input
                value={familyNum}
                onChange={handleFamilyNumberChange}
                id="family"
                type="number"
                className="w-full border border-gray-300 focus:outline-none p-2 rounded-md"
                required
              />
              {familyNumError ? (
                <div className="my-2 text-red-500">{familyNumError}</div>
              ) : null}
            </div>
          ) : null}
          <div className="mb-3 md:mb-4 lg:mb-5">
            <label
              htmlFor="startDate"
              className="text-textColor font-semibold block mb-1"
            >
              {t("adminn")}
            </label>
            <MainSelect
              options={global.account_type}
              value={
                global.account_type?.find((option) => option.id === userType)
                  ?.name
              }
              onSelect={handleUserTypeChange}
            />
          </div>
          <div className="flex items-center justify-center gap-6 md:gap-8 lg:gap-12">
            {isLoading ? (
              <LoadingBtn />
            ) : (
              <MainBtn type="submit" text="sendReservationn" />
            )}

            <button
              onClick={() => setShowBookingForm(false)}
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

export default BookingForm;
