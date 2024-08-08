import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import { FaBoxOpen } from "react-icons/fa";
import { useTranslation } from "react-i18next";
const Table = ({ columns, bodyData }) => {
  const { t } = useTranslation();
  return (
    <>
      <table className="w-full overflow-x-auto">
        <TableHeader columns={columns} bodyData={bodyData} />
        {bodyData.length > 0 && (
          <TableBody bodyData={bodyData} columns={columns} />
        )}
      </table>
      {bodyData.length === 0 && (
        <div
          colSpan={"4"}
          className="flex flex-col justify-center items-center gap-10 py-10 bg-lightGray"
          style={{ columnSpan: 10 }}
        >
          <FaBoxOpen size={80} className="text-mainColor" />
          <p className="text-mainColor">{t("no data available")}</p>
        </div>
      )}
    </>
  );
};

export default Table;
