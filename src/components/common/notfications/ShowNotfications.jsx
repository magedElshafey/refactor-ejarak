import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatDateTime } from "../../../utils/formateDateTime";
import getNotificationLink from "../../../utils/getNotificationLink";
const ShowNotfications = ({ data }) => {
  const { userData } = useSelector((state) => state.authSlice);
  const role = userData?.account?.type;
  const navigate = useNavigate();
  const handleNavigate = (id) => {
    const url = getNotificationLink(data.type, role, data?.realty_id);
    navigate(url);
  };
  return (
    <div
      onClick={() => handleNavigate(data?.realty_id)}
      className={`cursor-pointer mb-3 w-full flex items-center justify-between  p-1 rounded-md ${
        data.seen === 1 ? "bg-[#f6f5f5]" : "bg-slate-100"
      }`}
    >
      <div>
        <div className=" font-medium mb-2">{data?.title?.substr(0, 40)}</div>
      </div>
      <p className="text-xs text-center">{formatDateTime(data?.created_at)}</p>
    </div>
  );
};

export default ShowNotfications;
