import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Spinner from "../../../components/common/Spinner";
import { useQuery } from "react-query";
import { getReportDetails } from "../../../services/get/dashboard/getReportDetails";
import { formatDateTime } from "../../../utils/formateDateTime";
const ReportDetails = () => {
  const { t } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();
  const { isLoading, data } = useQuery(["report-details", params.id], () =>
    getReportDetails(params.id)
  );
  console.log("data from report details", data?.data?.data);
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-8 mt-6">
          <p className="mb-8 text-textColor text-md md:text-lg lg:text-xl xl:text-2xl">
            {t("report details")}
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-12 p-3 rounded-md border border-textColor ">
            <div>
              <p className="font-bold mb-2">{t("Name of the drug reported")}</p>
              <p className="text-textColor">
                {data?.data?.data?.realestate?.name}
              </p>
            </div>
            <div>
              <p className="font-bold mb-2">
                {t("person submitting the report")}
              </p>
              <p className="text-textColor">{data?.data?.data?.user?.name}</p>
            </div>
            <div>
              <p className="font-bold mb-2">{t("report date")}</p>
              <p className="text-textColor">
                {formatDateTime(data?.data?.data?.created_at)}
              </p>
            </div>
            <div>
              <p className="font-bold mb-2">{t("report details")}</p>
              <p className="text-textColor">
                {!data?.data?.data?.report_reason_id?.key
                  ? data?.data?.data?.report_reason_id?.name
                  : data?.data?.data?.another_reason}
              </p>
            </div>
          </div>
          <div className="w-full flex items-center justify-end">
            <button
              type="button"
              className="font-semibold"
              onClick={() => navigate(-1)}
            >
              {t("back")}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ReportDetails;
