import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import Spinner from "../../components/common/Spinner";
import { getWhishlist } from "../../services/get/getWhishlist";
import RealstateCard from "../../components/common/RealstateCard";
import LoadingTitle from "../../components/common/LoadingTitle";
import NoDataTitle from "../../components/common/NoDataTitle";
import Pagination from "../../components/common/Pagination";
import ErrorHandling from "../../components/common/ErrorHandling";
const Whishlist = () => {
  const { isLoading, data, isError } = useQuery("favorites", getWhishlist);
  const itemsPerPage = 5;
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
    <div>
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <ErrorHandling />
      ) : (
        <div className="container mx-auto px-8 mt-8">
          <div>
            {data?.data?.data.length ? (
              data?.data?.data
                .slice(offset, offset + itemsPerPage)
                .map((item, index) => (
                  <RealstateCard key={index} data={item} dep="all realstates" />
                ))
            ) : (
              <NoDataTitle />
            )}
          </div>
          {data?.data?.data?.length > itemsPerPage ? (
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={data?.data?.data.length}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Whishlist;
