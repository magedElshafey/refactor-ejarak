import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import { FaBoxOpen } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Table = ({ columns, bodyData, numbersBeginning = 0 }) => {
  const { t } = useTranslation();

  return (
    <>
      <table className="min-w-full text-center px-2">
        <TableHeader columns={columns} />

        {bodyData.length > 0 && (
          <TableBody 
            bodyData={bodyData} 
            columns={columns} 
            numbersBeginning={numbersBeginning}
          />
        )}
      </table>

      {bodyData.length === 0 && (
        <div
          colSpan={"4"}
          className="flex flex-col justify-center items-center gap-10 py-10"
          style={{ columnSpan: 10 }}
        >
          <FaBoxOpen size={80} className="text-maincolorgreen" />
          <p className="text-maincolorgreen">{t("no data available")}</p>
        </div>
      )}

    </>
  );
};

export default Table;