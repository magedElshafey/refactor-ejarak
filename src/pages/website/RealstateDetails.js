import React, { useState } from "react";
import { useQuery } from "react-query";
import Spinner from "../../components/common/Spinner";
import { getRealStateDetails } from "../../services/get/getRealStateDetails";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import RealstateAssets from "../../components/realstate/RealstateAssets";
import RealstateInfo from "../../components/realstate/RealstateInfo";
import Meta from "../../components/common/meta/Meta";
import RealstateData from "../../components/realstate/RealstateData";
import RealstateLocation from "../../components/realstate/RealstateLocation";
import RealstateOwnerCard from "../../components/realstate/RealstateOwnerCard";
import { useSelector } from "react-redux";
import { getSimilarRealstates } from "../../services/get/getSimilarRealstate";
import RealstateCard from "../../components/common/RealstateCard.jsx";
import SubmitReview from "../../components/realstate/SubmitReview.jsx";
import ViewReviews from "../../components/realstate/ViewReviews.jsx";
import BookingBtn from "../../components/realstate/booking/BookingBtn.jsx";
import BookingForm from "../../components/realstate/booking/BookingForm.jsx";
import ContactWithCustomerServiceBtn from "../../components/realstate/ContactWithCustomerServiceBtn.jsx";
import ReportRealstateBtn from "../../components/realstate/report/ReportRealstateBtn.jsx";
import ReportForm from "../../components/realstate/report/ReportForm.jsx";
import RealstateVideoAndSuck from "../../components/realstate/RealstateVideoAndSuck.jsx";
import SuckModal from "../../components/realstate/SuckModal.jsx";
import PendingRealstate from "../../components/realstate/PendingRealstate.jsx";

const RealstateDetails = () => {
  const params = useParams();
  const { ejarakLogin, userData } = useSelector((state) => state.authSlice);

  const userId = userData?.id;
  const { t } = useTranslation();
  const { isLoading, data } = useQuery(["realstate-details", params.id], () =>
    getRealStateDetails(params.id)
  );
  const { isLoading: loadingSimilars, data: similars } = useQuery(
    ["similars-realstate", params.id],
    () => getSimilarRealstates(params.id)
  );
  const [showBookingForm, setShowBookingForm] = useState(false);
  const toggleShowBookingForm = () => setShowBookingForm(!showBookingForm);
  const [showReportForm, setShowReportForm] = useState(false);
  const toggleShowReportForm = () => setShowReportForm(!showBookingForm);
  const [showSuckModal, setShowSuckModal] = useState(false);
  return (
    <>
      {isLoading || loadingSimilars ? (
        <Spinner />
      ) : (
        <div>
          <div className="container mx-auto px-8 mt-8">
            <Meta title={data?.data?.data?.name} />
            <RealstateInfo
              name={data?.data?.data?.name}
              realStateOwnerId={data?.data?.data?.user?.id}
              userId={userId}
              status={data?.data?.data?.status}
              id={params.id}
            />
            {data?.data?.data?.status === "pending" ? (
              <PendingRealstate num={data?.data?.data?.number_ad} />
            ) : null}
            <RealstateAssets
              images={data?.data?.data?.images}
              data={data?.data?.data}
            />
            <RealstateVideoAndSuck
              video={data?.data?.data?.video}
              suck={data?.data?.data?.instrument_file}
              setShowSuckModal={setShowSuckModal}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 my-8">
              <RealstateData data={data?.data?.data} />
              <RealstateLocation data={data?.data?.data} />
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 my-8">
              <div className="bg-white p-4 rounded-lg shadow-lg flex-1">
                <p className="mb-3 font-extrabold">{t("notes")}</p>
                <p className="text-textColor">{data?.data?.data?.notes}</p>
              </div>
              <div className="bg-white p-7 rounded-lg shadow-lg  border-2 border-maincolorgreen w-full md:w-[350px] ">
                <p className="text-md md:text-lg lg:text-xl font-semibold text-textColor mb-2">
                  {t("price")}
                </p>
                <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl  font-extrabold  text-maincolorgreen mb-2">
                  {data?.data?.data?.price} {t("currency")}
                </p>
              </div>
            </div>
            {data?.data?.data?.user?.id !== userId ? (
              <div className="my-8">
                <RealstateOwnerCard
                  name={data?.data?.data?.user?.name}
                  img={data?.data?.data?.user?.avatar?.original}
                  phone={`tel:${data?.data?.data?.user?.phone?.country_code}${data?.data?.data?.user?.phone?.number}`}
                  whatsapp={`https://wa.me/${data?.data?.data?.user?.phone?.country_code}${data?.data?.data?.user?.phone?.number}`}
                  id={data?.data?.data?.user?.id}
                />
              </div>
            ) : null}
            {ejarakLogin && data?.data?.data?.user?.id !== userId ? (
              <div className="flex items-center justify-center md:justify-between gap-1 flex-wrap my-8">
                <BookingBtn toggleShowBookingForm={toggleShowBookingForm} />
                <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
                  <ContactWithCustomerServiceBtn />
                  <ReportRealstateBtn
                    toggleShowReportForm={toggleShowReportForm}
                  />
                </div>
              </div>
            ) : null}
          </div>
          <div className="w-full bg-white">
            <div className="container mx-auto p-8">
              {ejarakLogin && data?.data?.data?.user?.id !== userId ? (
                <SubmitReview data={data?.data?.data} />
              ) : null}
              <div className="mt-8">
                <ViewReviews id={params.id} />
              </div>
              {similars?.data?.data?.length ? (
                <>
                  <div className="my-8 w-full h-[1px] bg-textColor"></div>
                  <p className=" mb-5 font-bold text-lg md:text-xl lg:text-2xl">
                    {t("related")}
                  </p>
                  {similars?.data?.data?.map((item, index) => (
                    <RealstateCard key={index} data={item} />
                  ))}
                </>
              ) : null}
            </div>
          </div>
          <BookingForm
            showBookingForm={showBookingForm}
            setShowBookingForm={setShowBookingForm}
            data={data?.data?.data}
          />
          <ReportForm
            showReportForm={showReportForm}
            setShowReportForm={setShowReportForm}
            id={params.id}
          />
          <SuckModal
            showSuckModal={showSuckModal}
            setShowSuckModal={setShowSuckModal}
            suck={data?.data?.data?.instrument_file}
          />
        </div>
      )}
    </>
  );
};

export default RealstateDetails;
