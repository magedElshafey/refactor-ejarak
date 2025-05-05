import React from "react";
import SearchOnMap from "../../components/common/map/SearchOnMap";
import MapView from "../../components/common/map/MapView";
import Filter from "../../components/common/filter/Filter";
import { useNafath } from "../../hooks/useNafath";
import NafathModal from "../../components/common/naftahmodal/NafathModal";
const Home = () => {
  const {
    showModal,
    randomNum,
    nafazStatus,
    loadingNafazStatus,
    loadingNafaz,
    handleStart,
    handleStatusCheck,
    setRandomNum,
    setNafazStatus,
    role,
  } = useNafath();
  return (
    <>
      <div className="h mt-8  flex items-center">
        <div className="md:backdrop-blur-md md:backdrop-brightness-150 md:border-2 md:border-white rounded-xl p-4 w-full flex  gap-4">
          <div className=" hidden lg:block w-[350px] ">
            <Filter
              bg="bg-white"
              rounded="rounded-md"
              showRealStateBtn={true}
              mobileVieow={false}
            />
          </div>
          <div className="flex-1">
            <SearchOnMap />
            <MapView />
          </div>
        </div>
      </div>
      <NafathModal
        showModal={showModal}
        randomNum={randomNum}
        nafazStatus={nafazStatus}
        loadingNafaz={loadingNafaz}
        loadingNafazStatus={loadingNafazStatus}
        onCheckStatus={handleStatusCheck}
        onRetry={() => {
          setRandomNum("");
          handleStart();
          setNafazStatus("");
        }}
        role={role}
      />
    </>
  );
};

export default Home;
