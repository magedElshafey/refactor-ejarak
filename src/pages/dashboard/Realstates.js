import React, { useState } from "react";
import RealStatesBody from "../../components/dashboard/realStates/RealStatesBody";
import RealStatesHeader from "../../components/dashboard/realStates/RealStatesHeader";

const Realstates = () => {
  const [search, setSearch] = useState();
  return (
    <div className="container mx-auto px-8 ">
      <div className="mb-8">
        <RealStatesHeader onSearchChange={setSearch} />
      </div>
      <RealStatesBody tableSearch={search} />
    </div>
  );
};

export default Realstates;
