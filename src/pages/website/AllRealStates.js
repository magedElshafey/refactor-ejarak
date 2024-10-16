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
import CityBtn from "../../components/common/filter/CityBtn";
const AllRealStates = () => {
  const dispatch = useDispatch();
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);
  // reset all redux value when the page loaded
  useEffect(() => {
    dispatch(resetFilter());
  }, [dispatch]);
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
    cityId,
    airConditions,
    parkingNumbers,
    hasKitchen,
    isEstaplished,
  } = useSelector((state) => state.filterSlice);
  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(0);
  }, [
    categoryId,
    subCategoryId,
    highPrice,
    lowPrice,
    roomNumbers,
    bathrooms,
    area,
    name,
    priceCreate,
    sortCreate,
    sort,
    cityId,
    airConditions,
    parkingNumbers,
    hasKitchen,
    isEstaplished,
  ]);
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
      cityId,
      currentPage, // بدء الترقيم من 1 في الـ API
      itemsPerPage,
      airConditions,
      parkingNumbers,
      hasKitchen,
      isEstaplished,
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
        sortCreate,
        cityId,
        currentPage + 1, // بدء الترقيم من 1 في الـ API
        itemsPerPage,
        airConditions,
        parkingNumbers,
        hasKitchen,
        isEstaplished
      ),
    {
      keepPreviousData: true, // للحفاظ على البيانات السابقة عند التغيير
    }
  );

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
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
              data?.data?.data?.map((item, index) => (
                <RealstateCard key={index} data={item} dep="all-realstates" />
              ))
            ) : (
              <NoDataTitle />
            )}
            {data?.data?.meta?.total > itemsPerPage ? (
              <Pagination
                onPageChange={handlePageChange}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalItems={data?.data?.meta?.total}
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllRealStates;
