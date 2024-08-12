import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getAllRealstates } from "../../services/get/getAllRealStates";
import { useSelector, useDispatch } from "react-redux";
import { resetFilter } from "../../store/filterSlice";
import Filter from "../../components/common/filter/Filter";
import Search from "../../components/common/filter/Search";
import RealstateCard from "../../components/common/RealstateCard";
import LoadingTitle from "../../components/common/LoadingTitle";
import NoDataTitle from "../../components/common/NoDataTitle";
import PriceBtn from "../../components/common/filter/PriceBtn";
import ReviewBtn from "../../components/common/filter/ReviewBtn";
import NewsBtn from "../../components/common/filter/NewsBtn";
import Pagination from "../../components/common/Pagination";
import MainSelect from "../../components/common/inputs/MainSelect";
import { useGlobalContext } from "../../hooks/GlobalContext";
import CityBtn from "../../components/common/filter/CityBtn";
const AllRealStates = () => {
  const dispatch = useDispatch();
  const { data: global } = useGlobalContext();
  const [cityId, setCityId] = useState();
  const handleCityIdChange = (opt) => setCityId(opt.id);
  // reset all redux value when the page loaded
  useEffect(() => {
    dispatch(resetFilter());
  }, []);
  const {
    categoryId,
    subCategoryId,
    highPrice,
    lowPrice,
    roomNumbers,
    bathrooms,
    area,
    priceCreate,
    name,
    sortCreate,
    sort,
  } = useSelector((state) => state.filterSlice);

  const { isLoading, data } = useQuery(
    [
      "all-realstates",
      categoryId,
      subCategoryId,
      highPrice,
      lowPrice,
      roomNumbers,
      bathrooms,
      area,
      name,
      priceCreate,
      sort,
      sortCreate,
    ],
    () =>
      getAllRealstates(
        name,
        roomNumbers,
        bathrooms,
        highPrice,
        lowPrice,
        area,
        categoryId,
        subCategoryId,
        sort,
        priceCreate,
        sortCreate
      )
  );

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    setCurrentPage(0); // Reset to first page when data changes
  }, [data?.data?.data]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  const offset = currentPage * itemsPerPage;
  return (
    <>
      <div className="container mx-auto px-8 mt-8">
        <div className="w-full hidden lg:flex items-center justify-between mb-5 gap-12 ">
          <div className="flex-1">
            <Search />
          </div>
          <div className="flex items-center gap-2">
            <PriceBtn />
            <ReviewBtn />
            <NewsBtn />
            <CityBtn />
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
            {isLoading ? (
              <LoadingTitle />
            ) : data?.data?.data.length ? (
              data?.data?.data
                .slice(offset, offset + itemsPerPage)
                .map((item, index) => (
                  <RealstateCard key={index} data={item} dep="all-realstates" />
                ))
            ) : (
              <NoDataTitle />
            )}
            {data?.data?.data?.length > itemsPerPage ? (
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={data?.data?.data.length}
                onPageChange={handlePageChange}
                currentPage={currentPage}
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllRealStates;
