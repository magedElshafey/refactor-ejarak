import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import Pagination from "../../components/common/Pagination";
import Spinner from "../../components/common/Spinner";
import { getPaginatedNotfications } from "../../services/get/getPaginatedNotfications";
import ShowNotfications from "../../components/common/notfications/ShowNotfications";
import NoDataTitle from "../../components/common/NoDataTitle";
const AllNotfications = () => {
  const { t } = useTranslation();
  const itemsPerPage = 24;
  const [currentPage, setCurrentPage] = useState(0);
  const { isLoading, data } = useQuery(
    ["get-all-notifcations", currentPage],
    () => getPaginatedNotfications(currentPage)
  );

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
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-8 mt-5">
          <p className="font-bold text-lg md:text-xl lg:text-2xl xl:text-3xl text-textColor mb-3">
            {t("notfications")}
          </p>
          <div className="w-full bg-white rounded-md p-3 shadow-2xl mb-3 border">
            {data?.data?.data.length ? (
              data?.data?.data
                .slice(offset, offset + itemsPerPage)
                .map((item, index) => (
                  <ShowNotfications key={index} data={item} />
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
    </>
  );
};

export default AllNotfications;
