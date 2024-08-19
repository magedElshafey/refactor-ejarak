import React, { useState, useEffect } from "react";
import Filter from "../../components/common/filter/Filter";
import Search from "../../components/common/filter/Search";
import useMap from "../../hooks/useMap";
import RealstateCard from "../../components/common/RealstateCard";
import LoadingTitle from "../../components/common/LoadingTitle";
import NoDataTitle from "../../components/common/NoDataTitle";
import PriceBtn from "../../components/common/filter/PriceBtn";
import ReviewBtn from "../../components/common/filter/ReviewBtn";
import NewsBtn from "../../components/common/filter/NewsBtn";
import Pagination from "../../components/common/Pagination";
const NearRealstates = () => {
  const { nearestRealStates, loadinNearRealStates } = useMap();
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setCurrentPage(0); // Reset to first page when data changes
  }, [nearestRealStates]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  const offset = currentPage * itemsPerPage;
  const currentItems = nearestRealStates.slice(offset, offset + itemsPerPage);
  return (
    <div className="container mx-auto px-8 mt-8">
      <div className="w-full hidden lg:flex items-center justify-between mb-5 gap-12 ">
        <div className="flex-1">
          <Search />
        </div>
        <div className="flex items-center gap-2">
          <PriceBtn />
          <ReviewBtn />
          <NewsBtn />
        </div>
      </div>
      <div className="w-full flex  gap-4 mb-5">
        <div className=" hidden lg:block sticky top-0 w-[350px] h-[600px] ">
          <Filter
            bg="bg-white"
            rounded="rounded-md"
            showRealStateBtn={false}
            mobileVieow={false}
          />
        </div>
        <div className="flex-1">
          {loadinNearRealStates ? (
            <LoadingTitle />
          ) : nearestRealStates.length ? (
            currentItems.map((item, index) => (
              <RealstateCard key={index} data={item} dep="near realstates" />
            ))
          ) : (
            <NoDataTitle />
          )}
          {nearestRealStates.length > itemsPerPage ? (
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={nearestRealStates.length}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default NearRealstates;
