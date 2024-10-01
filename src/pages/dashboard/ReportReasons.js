import React, { useState } from "react";
import Spinner from "../../components/common/Spinner";
import { useQuery } from "react-query";
import MainSelect from "../../components/common/inputs/MainSelect";
import { getReportReasons } from "../../services/get/dashboard/getReportReasons";
import AddReportReasonsForm from "../../components/dashboard/reports/AddReportReasonsForm";
import AddReportsBtn from "../../components/dashboard/reports/AddReportsBtn";
import EditReportBtn from "../../components/dashboard/reports/EditReportBtn";
import EditReportForm from "../../components/dashboard/reports/EditReportForm";
import RemoveReportBtn from "../../components/dashboard/reports/RemoveReportBtn";
const ReportReasons = () => {
  const { isLoading, data } = useQuery("reports", getReportReasons);
  const [reasonId, setReasonId] = useState("");
  const handleReasonChange = (opt) => setReasonId(opt.id);
  const [showReportForm, setShowReportForm] = useState(false);
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
                label="report reasons"
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
              <AddReportsBtn setShowReportForm={setShowReportForm} />

              <EditReportBtn
                setShowEditReportForm={setShowEditReportForm}
                id={reasonId}
              />
              <RemoveReportBtn id={reasonId} setReasonId={setReasonId} />
            </div>
          </div>
        </div>
      )}
      <AddReportReasonsForm
        showReportForm={showReportForm}
        setShowReportForm={setShowReportForm}
      />
      <EditReportForm
        showeditReportForm={showEditReportForm}
        setShoweditReportForm={setShowEditReportForm}
        id={reasonId}
      />
    </>
  );
};

export default ReportReasons;
