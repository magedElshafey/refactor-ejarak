import React from "react";
import SearchOnMap from "../../components/common/map/SearchOnMap";
import MapView from "../../components/common/map/MapView";
import Filter from "../../components/common/filter/Filter";

const Home = () => {
  return (
    <div className="h container mx-auto px-8 mt-8  flex items-center">
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
  );
};

export default Home;
