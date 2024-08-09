import React from "react";
import { useTranslation } from "react-i18next";
const TableHeader = ({ columns }) => {
  const { t } = useTranslation();
  return (
    <thead className=" bg-maincolorgreen text-white">
      <tr className="w-full text-nowrap">
      <th className="font-bold"> {t("index")}</th>
        {columns?.map((column, i) => (
          <th key={i} className="py-6 px-2 font-bold">
            {t(column.title)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
