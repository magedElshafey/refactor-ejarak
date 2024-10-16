import React, { useState } from "react";
import RealStatesBody from "../../components/dashboard/realStates/RealStatesBody";
import RealStatesHeader from "../../components/dashboard/realStates/RealStatesHeader";
import MainBtn from "../../components/common/buttons/MainBtn";
import { useNavigate } from "react-router-dom";
import {
  statusFilterDashboardEn,
  statusFilterDashboardAr,
} from "../../data/data";
import { useTranslation } from "react-i18next";
import { MdFilterAlt } from "react-icons/md";
import MainSelect from "../../components/common/inputs/MainSelect";
const Realstates = () => {
  const { t, i18n } = useTranslation();
  const [search, setSearch] = useState();
  const navigate = useNavigate();
  const action = () => navigate("/website/add-realstate");
  const [showFilter, setShowFilter] = useState(false);
  const handleShowFilter = () => setShowFilter(!showFilter);
  const [realstateStatus, setRealstateStatus] = useState("");
  const handleRealstateStatusChange = (opt) => setRealstateStatus(opt.id);
  return (
    <div className="container mx-auto px-8 ">
      <div className="mb-8 flex items-center justify-between gap-6">
        <div className="flex-1">
          <RealStatesHeader onSearchChange={setSearch} />
        </div>
        <div className="flex items-center gap-3 flex-col lg:flex-row">
          <button
            onClick={handleShowFilter}
            className="flex items-center justify-center gap-3 p-3 bg-white text-maincolorgreen font-semibold border border-slate-400 rounded-lg min-w-[140px]"
          >
            <p>{t("filter")}</p>
            <MdFilterAlt size={20} />
          </button>
          <div className="w-[150px] md:w-[200px] lg:w-[220px]">
            <MainBtn text="add real state" action={action} />
          </div>
        </div>
      </div>
      <div
        className={`w-full p-3 flex items-center gap-3 rounded-lg bg-white shadow-sm my-8 duration-300 border border-slate-500 ${
          showFilter ? "block opacity-100" : "hidden opacity-0"
        }`}
      >
        <div className="w-[230px]">
          <MainSelect
            label="realstate status"
            options={
              i18n.language === "ar"
                ? statusFilterDashboardAr
                : statusFilterDashboardEn
            }
            onSelect={handleRealstateStatusChange}
            value={
              i18n.language === "en"
                ? statusFilterDashboardEn?.find(
                    (item) => item?.id === realstateStatus
                  )?.name
                : statusFilterDashboardAr?.find(
                    (item) => item?.id === realstateStatus
                  )?.name
            }
          />
        </div>
      </div>
      <RealStatesBody tableSearch={search} realstateStatus={realstateStatus} />
    </div>
  );
};

export default Realstates;
