import { FaFileExport } from "react-icons/fa";
import { useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Spinner from "../../components/common/Spinner";
import RealstateData from "../../components/reservationDetails/RealstateData";
import OwnerData from "../../components/reservationDetails/OwnerData";
import TenantData from "../../components/reservationDetails/TenantData";
import ReservationData from "../../components/reservationDetails/ReservationData";
import useReservationDetails from "../../hooks/useReservationDetails";
import { request } from "../../services/axios";
const ReservationDetails = () => {
  const params = useParams();
  const { t } = useTranslation();
  const { isLoading, data } = useReservationDetails(params.id);
  const location = useLocation();
  const { contractId } = location.state || {};

  const handleExport = async () => {
    try {
      const metaResponse = await request({
        url: `/Dashboard/eleAgent/contract/export_details_pdf/${contractId}`,
        method: "GET",
      });

      console.log("meta response is :", metaResponse);

      const downloadUrlFromApi = metaResponse.data.download_url;
      if (!downloadUrlFromApi) {
        throw new Error("Download URL not found in response");
      }
      const a = document.createElement("a");
      a.href = downloadUrlFromApi;

      a.download = "electronic_agent.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Export error:", error);
    }
  };
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-8 mt-8">
          <div className="flex items-center justify-between">
            <p className="text-lg md:text-xl lg:text-2xl font-bold text-textColor mb-8">
              {t("reservationDetails")}
            </p>
            <button
              onClick={handleExport}
              className="w-10 h-10 flex items-center justify-center border bg-white text-maincolorgreen hover:bg-gray-100 rounded-md"
            >
              <FaFileExport size={20} />
            </button>
          </div>

          <RealstateData data={data?.data?.data?.realestate} />
          <ReservationData data={data?.data?.data} />
          <OwnerData data={data?.data?.data?.realestate?.user} />
          <TenantData data={data?.data?.data?.tenant} />
        </div>
      )}
    </>
  );
};

export default ReservationDetails;
