import React from "react";
import ReactPaginate from "react-paginate";
import { useTranslation } from "react-i18next";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useLocation } from "react-router-dom";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";

const Paginate = ({ itemsPerPage, totalItems, onPageChange, currentPage }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isDashboardPath = location.pathname.includes("/dashboard");
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const handlePageClick = (event) => {
    onPageChange(event.selected);
  };

  return (
    <>
      {!isDashboardPath ? (
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
      ) : (
        <div className="w-full flex justify-end">
          <div className="flex items-center gap-2">
            <ReactPaginate
              previousLabel={
                i18n.language === "ar" ? (
                  <div className="w-7 h-7 border border-slate-300 flex items-center justify-center rounded-md">
                    <MdOutlineKeyboardArrowRight size={15} />
                  </div>
                ) : (
                  <div className="w-7 h-7 border border-slate-300 flex items-center justify-center rounded-md">
                    <MdOutlineKeyboardArrowLeft size={15} />
                  </div>
                )
              }
              nextLabel={
                i18n.language === "ar" ? (
                  <div className="w-7 h-7 border border-slate-300 flex items-center justify-center rounded-md">
                    <MdOutlineKeyboardArrowLeft size={15} />
                  </div>
                ) : (
                  <div className="w-7 h-7 border border-slate-300 flex items-center justify-center rounded-md">
                    <MdOutlineKeyboardArrowRight size={15} />
                  </div>
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
              pageClassName={
                "w-7 h-7 flex items-center justify-center border border-gray-300 bg-white rounded-md"
              }
              activeClassName={
                "paginationActive bg-maincolorgreen text-white w-7 h-7 flex items-center justify-center"
              }
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Paginate;
