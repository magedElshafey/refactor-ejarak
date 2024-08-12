import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown } from "react-icons/io";
import getStatusBackgroundColor from "../../../../utils/dashboard/getStatusBackgroundColor";

const options = ["pending", "accepted", "refused"];

const TableStatus = ({ status, onChange }) => {
  const [active, setActive] = useState(false);
  const ref = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    const clickHandler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setActive(false);
      }
    };

    window.addEventListener("click", clickHandler);

    return () => {
      window.removeEventListener("click", clickHandler);
    };
  }, []);

  return (
    <div
      ref={ref}
      onClick={status === "pending" ? () => setActive(!active) : undefined}
      className="w-full relative -z-1"
    >
      <div
        className={`${getStatusBackgroundColor(
          status
        )} py-2 w-full rounded-2xl flex items-center text-sm ${
          status === "pending"
            ? "justify-between px-4 cursor-pointer"
            : "justify-center"
        }`}
      >
        <p>{t(status)}</p>
        {status === "pending" && <IoIosArrowDown />}
      </div>
      {active && (
        <div className="absolute top-full left-0 p-2 w-full border bg-white rounded-xl z-10 gap-2 ">
          {options
            .filter((option) => option !== status)
            .map((option) => {
              return (
                <div
                  key={option}
                  onClick={(e) => {
                    onChange(option);
                    setActive(false);
                    e.stopPropagation();
                  }}
                  className="cursor-pointer hover:bg-gray-200 w-full text-center rounded-lg p-1"
                >
                  {t(option)}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default TableStatus;
