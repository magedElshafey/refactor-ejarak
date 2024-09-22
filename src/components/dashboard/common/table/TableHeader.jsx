import React from "react";
import { useTranslation } from "react-i18next";
const TableHeader = ({ columns }) => {
  const { t } = useTranslation();
  return (
    <thead className="  mb-5 text-center">
      <tr className="w-full text-nowrap text-center">
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
