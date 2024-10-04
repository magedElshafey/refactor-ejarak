import React, { useState } from "react";
import { useQuery } from "react-query";
import Spinner from "../../components/common/Spinner";
import { getRealStateDetails } from "../../services/get/getRealStateDetails";
import { Link, useParams } from "react-router-dom";
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
import MainInput from "../../components/common/inputs/MainInput.jsx";
import RefusedReason from "../../components/common/RefusedReason.jsx";
import { FaComment, FaEye } from "react-icons/fa";
import { MdStarRate } from "react-icons/md";

const RealstateDetails = ({ isDashboard }) => {
  const params = useParams();
  const { ejarakLogin, userData } = useSelector((state) => state.authSlice);
  const role = userData?.account?.type;
  const userId = userData?.id;
  const { t } = useTranslation();
  const [rating, setRating] = useState("");
  const { isLoading, data } = useQuery(
    ["realstate-details", params.id],
    () => getRealStateDetails(params.id),
    {
      onSuccess: (data) => {
        setRating(data?.data?.data?.avg_rating);
      },
    }
  );
  console.log("data from realstate", data?.data?.data);
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
              isDashboard={isDashboard}
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
              realStateOwnerId={data?.data?.data?.user?.id}
              userId={userId}
              role={role}
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
            {isDashboard ? null : data?.data?.data?.user?.id !== userId ? (
              <div className="my-8">
                <RealstateOwnerCard
                  name={data?.data?.data?.user?.name}
                  img={data?.data?.data?.user?.avatar?.original}
                  phone={`tel:${data?.data?.data?.user?.phone?.country_code}${data?.data?.data?.user?.phone?.number}`}
                  whatsapp={`https://wa.me/${data?.data?.data?.user?.phone?.country_code}${data?.data?.data?.user?.phone?.number}`}
                  id={data?.data?.data?.user?.id}
                  ejarakLogin={ejarakLogin}
                />
              </div>
            ) : null}
            {isDashboard ? null : ejarakLogin &&
              data?.data?.data?.user?.id !== userId ? (
              <div className="flex items-center justify-center md:justify-between gap-1 flex-wrap my-8">
                {role === "tenant" ? (
                  <BookingBtn toggleShowBookingForm={toggleShowBookingForm} />
                ) : null}
                {role === "tenant" || role === "owner" ? (
                  <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
                    <ContactWithCustomerServiceBtn />
                    <ReportRealstateBtn
                      toggleShowReportForm={toggleShowReportForm}
                    />
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="w-full bg-white">
            <div className="container mx-auto p-8">
              {isDashboard ? null : ejarakLogin &&
                data?.data?.data?.user?.id !== userId ? (
                <SubmitReview data={data?.data?.data} id={params.id} />
              ) : !ejarakLogin && data?.data?.data?.user?.id !== userId ? (
                <Link
                  to="/auth/login"
                  className="text-xs md:text-sm lg:text-base font-light text-red-600 underline"
                >
                  * {t("review hint")}
                </Link>
              ) : null}

              <div className="mt-8">
                <ViewReviews id={params.id} rating={rating} />
              </div>
              {isDashboard ? null : similars?.data?.data?.length ? (
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
              {isDashboard ? (
                <div className="my-8 w-full md:w-1/2">
                  <MainInput
                    disabled
                    value={t(data?.data?.data?.status)}
                    label={t("realstate status")}
                  />
                  {data?.data?.data?.status === "refused" ? (
                    <RefusedReason reason={data?.data?.data?.reason_refuse} />
                  ) : null}
                </div>
              ) : null}
              {isDashboard ? (
                <div className="my-8">
                  <p className="mb-3 font-bold text-md md:text-lg lg:text-xl xl:text-2xl text-textColor">
                    {t("realstate owner data")}
                  </p>
                  <div className="flex flex-col items-center justify-between md:flex-row gap-4 md:gap-6 lg:gap-24">
                    <div className="w-full md:w-1/2">
                      <div className="my-4">
                        <MainInput
                          disabled
                          label={t("name")}
                          value={data?.data?.data?.user?.name}
                        />
                      </div>
                      <div className="my-4">
                        <MainInput
                          disabled
                          label={t("email")}
                          value={data?.data?.data?.user?.email?.address}
                        />
                      </div>
                      <div className="my-4">
                        <MainInput
                          disabled
                          label={t("emailOrPhone")}
                          value={data?.data?.data?.user?.phone?.number}
                        />
                      </div>
                      <MainInput
                        disabled
                        value={data?.data?.data?.user?.nationalId}
                        label={t("id")}
                      />
                    </div>
                    <div className="w-full md:w-1/2">
                      <img
                        alt={data?.data?.data?.user?.name}
                        className=" max-h-[250px] object-contain"
                        src={data?.data?.data?.user?.avatar?.original}
                      />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="container mx-auto px-8">
            {isDashboard ? (
              <div className="my-8">
                <p className="mb-3 text-textColor font-bold text-base md:text-md lg:text-lg xl:text-xl">
                  {t("statistics")}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                  <div className=" shadow-xl p-3 rounded-md flex flex-col items-center gap-3">
                    <FaComment size={40} className="text-maincolorgreen" />
                    <p className="font-semibold">{t("comments number")}</p>
                    <p>{data?.data?.data?.comments_no}</p>
                  </div>
                  <div className=" shadow-xl p-3 rounded-md flex flex-col items-center gap-3">
                    <FaEye size={40} className="text-red-500" />
                    <p className="font-semibold">{t("watching number")}</p>
                    <p>{data?.data?.data?.views_count}</p>
                  </div>
                  <div className=" shadow-xl p-3 rounded-md flex flex-col items-center gap-3">
                    <MdStarRate size={40} className="text-textColor" />
                    <p className="font-semibold">{t("rating average")}</p>
                    <p>{data?.data?.data?.avg_rating}</p>
                  </div>
                </div>
              </div>
            ) : null}
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
