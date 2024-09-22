import React from "react";
import { useTranslation } from "react-i18next";

// دالة للوصول إلى القيم المتداخلة باستخدام dot notation
const getNestedValue = (obj, path) => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};

const TableBody = ({ bodyData, columns, numbersBeginning }) => {
  const { t } = useTranslation();
  return (
    <tbody className="">
      {bodyData?.map((data, i) => (
        <tr
          key={i}
          className="border border-slate-700 text-center bg-white text-slate-600 "
        >
          <td className="p-2 bg-[#f7f7f7]"> {i + 1 + numbersBeginning} </td>
          {columns?.map((column, j) => {
            const value = column.dataIndex
              ? getNestedValue(data, column.dataIndex)
              : null;
            if (column.render) {
              return (
                <td className="p-3 font-medium " key={`${i}-${j}`}>
                  {column.render(value, data)}
                </td>
              );
            }
            return (
              <td className="p-3 font-medium truncate" key={`${i}-${j}`}>
                {t(value).substr(0, 30)} {t(value).length > 30 ? "...." : null}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
