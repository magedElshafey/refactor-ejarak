import React from "react";
import { useTranslation } from "react-i18next";

// دالة للوصول إلى القيم المتداخلة باستخدام dot notation
const getNestedValue = (obj, path) => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};

const TableBody = ({ bodyData, columns }) => {
  const { t } = useTranslation();
  return (
    <tbody>
      {bodyData?.map((data, i) => (
        <tr key={i}>
          {columns?.map((column, j) => {
            const value = column.dataIndex
              ? getNestedValue(data, column.dataIndex)
              : null;
            if (column.render) {
              return (
                <td className="py-1 px-2 font-medium" key={i + j}>
                  {column.render(value, data)}
                </td>
              );
            }
            return (
              <td className="py-1 px-2 font-medium" key={i + j}>
                {t(value)}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
