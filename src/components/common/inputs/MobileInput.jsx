import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGlobalContext } from "../../../hooks/GlobalContext";
import { IoMdArrowDropdown } from "react-icons/io";

const MobileInput = ({ value, error, onChange, bg }) => {
  const { t } = useTranslation();
  const { data } = useGlobalContext();

  const ref = useRef(null);
  const [show, setShow] = useState(false);
  return (
    <div className="mb-4">
      <label className="block mb-1 text-textColor text-md font-medium">
        {t("mobilePhone")}
      </label>
      <div
        className={`border border-[#9399A3] rounded-xl p-3 ${
          bg ? bg : "bg-white"
        }`}
      >
        <div className="w-full flex justify-between items-center gap-3">
          <div
            className="flex items-center gap-1 relative cursor-pointer"
            onClick={() => setShow(!show)}
          >
            <IoMdArrowDropdown size={20} />
            <img
              alt="flag"
              className="w-[20px] h-[20px] object-contain"
              src={data?.countries[0]?.flag}
            />
          </div>
          <div dir="ltr" className="flex-1 flex items-center gap-2">
            <p>{data?.countries[0]?.phone_prefix_code}</p>
            <input
              placeholder="5xxxxxxxx"
              dir="ltr"
              required
              className="border-none focus:outline-none flex-1 bg-transparent"
              value={value}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
      {error ? <div className="my-2 text-sm text-red-600">{error}</div> : null}
    </div>
  );
};

export default MobileInput;
/**
 *   <div>
      <label className="block mb-1 text-textColor text-md font-medium">
        {t("mobilePhone")}
      </label>
      <div
        className={`w-full p-3 relative border border-[#9399A3] rounded-xl ${
          bg ? bg : "bg-white"
        }`}
      >
        <div className="w-full flex items-center justify-between gap-2">
          <div
            className="flex items-center gap-1 relative cursor-pointer"
            onClick={() => setShow(!show)}
          >
            <IoMdArrowDropdown size={20} />
            <img
              alt="flag"
              className="w-[20px] h-[20px] object-contain"
              src={data.countries[0].flag}
            />
          </div>
          <input
            placeholder="5xxxxxxxx"
            dir="ltr"
            required
            className="border-none focus:outline-none flex-1 bg-transparent"
            value={value}
            onChange={onChange}
          />
          <p dir="ltr">{data?.countries[0]?.phone_prefix_code}</p>
        </div>
      </div>
      {error ? <div className="my-2 text-sm text-red-600">{error}</div> : null}
    </div>
 */
