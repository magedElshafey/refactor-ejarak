import React, { useState } from "react";
import Spinner from "../../components/common/Spinner";
import { useQuery } from "react-query";
import MainSelect from "../../components/common/inputs/MainSelect";
import { getBookingRefusedReasons } from "../../services/get/dashboard/getBookingRefusedReasons";
import AddBookingRefusedReasonBtn from "../../components/dashboard/booking/AddBookingRefusedReasonBtn";
import AddBookingRefusedReasonForm from "../../components/dashboard/booking/AddBookingRefusedReasonForm";
import RemoveBookingBtn from "../../components/realstate/booking/RemoveBookingBtn";
import EditBookingBtn from "../../components/realstate/booking/EditBookingBtn";
import EditBookingForm from "../../components/realstate/booking/EditBookingForm";
const BookingReasons = () => {
  const { isLoading, data } = useQuery(
    "booking-refused-reasons",
    getBookingRefusedReasons
  );
  const [reasonId, setReasonId] = useState("");
  const handleReasonChange = (opt) => setReasonId(opt.id);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showEditReportForm, setShowEditReportForm] = useState(false);
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-8 mt-8">
          <div className="flex items-center gap-4 md:gap-8 lg:gap-12 flex-col md:flex-row">
            <div className="w-full md:w-1/2">
              <MainSelect
                onSelect={handleReasonChange}
                label="booking refused reasons"
                options={data?.data?.data}
                value={
                  reasonId
                    ? data?.data?.data?.find((item) => item.id === +reasonId)
                        .name
                    : reasonId
                }
              />
            </div>
            <div className="md:w-1/2 flex items-center gap-3 flex-wrap md:mt-8">
              <AddBookingRefusedReasonBtn
                setShowBookingForm={setShowBookingForm}
              />

              <EditBookingBtn
                setShowEditReportForm={setShowEditReportForm}
                id={reasonId}
              />
              <RemoveBookingBtn id={reasonId} setReasonId={setReasonId} />
            </div>
          </div>
        </div>
      )}
      <AddBookingRefusedReasonForm
        showBookingForm={showBookingForm}
        setShowBookingForm={setShowBookingForm}
      />

      <EditBookingForm
        showeditReportForm={showEditReportForm}
        setShoweditReportForm={setShowEditReportForm}
        id={reasonId}
        setReasonId={setReasonId}
      />
    </>
  );
};

export default BookingReasons;
