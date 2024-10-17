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
          className=" text-center bg-white text-slate-600    border-slate-500 rounded-lg "
        >
          <td className="p-2 bg-[#f7f7f7]   border-slate-500 border-l rounded-tr-2xl">
            {i + 1 + numbersBeginning}{" "}
          </td>
          {columns?.map((column, j) => {
            const value = column.dataIndex
              ? getNestedValue(data, column.dataIndex)
              : null;
            const isLastColumn = j === columns.length - 1;

            if (column.render) {
              return (
                <td
                  className={`p-3 font-medium border-t border-b  border-slate-500 ${
                    isLastColumn ? "border-l" : null
                  } `}
                  key={`${i}-${j}`}
                >
                  {column.render(value, data)}
                </td>
              );
            }
            return (
              <td
                className={`p-3 font-medium truncate border-t border-b  border-slate-500 ${
                  isLastColumn ? "border-l" : null
                } `}
                key={`${i}-${j}`}
              >
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
