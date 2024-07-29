import React from "react";
import ReactPaginate from "react-paginate";
import { useTranslation } from "react-i18next";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Paginate = ({ itemsPerPage, totalItems, onPageChange, currentPage }) => {
  const { t, i18n } = useTranslation();

  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const handlePageClick = (event) => {
    onPageChange(event.selected);
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-0 justify-between items-center py-2 px-4 bg-[#ECEEEB] border border-[#BDC7BC] my-5 rounded-[10px]">
      <p className="">{t("pageNumber")}</p>
      <ReactPaginate
        previousLabel={
          i18n.language === "ar" ? (
            <IoIosArrowForward size={15} />
          ) : (
            <IoIosArrowBack size={15} />
          )
        }
        nextLabel={
          i18n.language === "ar" ? (
            <IoIosArrowBack size={15} />
          ) : (
            <IoIosArrowForward size={15} />
          )
        }
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        subContainerClassName={"pages pagination"}
        forcePage={currentPage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
};

export default Paginate;
