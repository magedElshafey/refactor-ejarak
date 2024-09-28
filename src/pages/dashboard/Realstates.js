import React, { useState } from "react";
import RealStatesBody from "../../components/dashboard/realStates/RealStatesBody";
import RealStatesHeader from "../../components/dashboard/realStates/RealStatesHeader";
import MainBtn from "../../components/common/buttons/MainBtn";
import { useNavigate } from "react-router-dom";
const Realstates = () => {
  const [search, setSearch] = useState();
  const navigate = useNavigate();
  const action = () => navigate("/website/add-realstate");
  return (
    <div className="container mx-auto px-8 ">
      <div className="mb-8 flex items-center justify-between gap-6">
        <div className="flex-1">
          <RealStatesHeader onSearchChange={setSearch} />
        </div>
        <div className="w-[150px] md:w-[200px] lg:w-[220px]">
          <MainBtn text="add real state" action={action} />
        </div>
      </div>
      <RealStatesBody tableSearch={search} />
    </div>
  );
};

export default Realstates;
