import React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Spinner from "../../components/common/Spinner";
import RealstateData from "../../components/reservationDetails/RealstateData";
import OwnerData from "../../components/reservationDetails/OwnerData";
import TenantData from "../../components/reservationDetails/TenantData";
import ReservationData from "../../components/reservationDetails/ReservationData";
import useReservationDetails from "../../hooks/useReservationDetails";
import MainBtn from "../../components/common/buttons/MainBtn";
import html2pdf from "html2pdf.js";
import logo from "../../assets//ejark green.png";
import Logo from "../../components/common/Logo";
const ManualContractDetails = () => {
  const params = useParams();
  const { t } = useTranslation();
  const { isLoading, data } = useReservationDetails(params.id);
  const downloadPDF = () => {
    const element = document.getElementById("pdf-content");
    const options = {
      margin: 0,
      filename: "contract.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 3 },
      jsPDF: { unit: "mm", format: "a3", orientation: "portrait" }, // استخدام `A3`
    };

    html2pdf().from(element).set(options).save();
  };
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-8 mt-8">
          <div className="w-full flex items-center justify-between mb-4">
            <p className="font-bold text-textColor text-md md:text-lg lg:text-xl xl:text-2xl ">
              {t("Create a contract (manually)")}
            </p>

            <div className="max-w-[200px]">
              <MainBtn action={downloadPDF} text={t("download contract")} />
            </div>
          </div>

          <div id="pdf-content" className="bg-white p-3 shadow-xl rounded-xl">
            <div className="mb-4 w-fit">
              <Logo img={logo} />
            </div>
            <RealstateData
              data={data?.data?.data?.realestate}
              downloadContract={true}
            />
            <ReservationData data={data?.data?.data} downloadContract={true} />
            <OwnerData
              data={data?.data?.data?.realestate?.user}
              downloadContract={true}
            />
            <TenantData
              data={data?.data?.data?.tenant}
              downloadContract={true}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ManualContractDetails;
