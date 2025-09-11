import React from "react";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { request } from "../../services/axios";
import Table from "../../components/dashboard/common/table/Table";
import StepProgress from "../../components/common/reservations/StepProgress";
import { formatDateTime } from "../../utils/formateDateTime";
import { useTranslation } from "react-i18next";
import Spinner from "../../components/common/Spinner";
const TrackMyOrders = () => {
  const { t } = useTranslation();
  const { userData } = useSelector((state) => state.authSlice);
  const ownerUrl = `/booking-contracts?owner_id=${userData?.id}`;
  const tenantUrl = `/booking-contracts?tenant_id=${userData?.id}`;
  const getBookinks = async () => {
    return await request({
      url: userData?.account?.type === "owner" ? ownerUrl : tenantUrl,
    });
  };
  const { isLoading, data } = useQuery(
    `${userData?.account?.type} booking status`,
    getBookinks
  );
  console.log("data", data?.data);
  const columns = [
    {
      title: "date",
      dataIndex: "created_at",
      render: (date) => {
        return formatDateTime(date, true);
      },
    },
    {
      title: "house title",
      dataIndex: "reality",
    },
    // {
    //   title: "houseType",
    //   dataIndex: "realestate.category.name",
    // },
    // {
    //   title: "tentName",
    //   dataIndex: "tenant.name",
    // },
    // {
    //   title: "reservationPeriod",
    //   dataIndex: "contract_period",
    //   render: (value) => {
    //     return (
    //       <p>
    //         {value} {t("months")}
    //       </p>
    //     );
    //   },
    // },
    {
      title: "status",
      dataIndex: "status_name",
      render: (status) => {
        return <StepProgress status={status} />;
      },
    },
  ];
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-8 mt-8">
          <Table columns={columns} bodyData={data?.data?.data || []} />
        </div>
      )}
    </>
  );
};

export default TrackMyOrders;
