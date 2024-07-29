import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGlobalContext } from "../../../hooks/GlobalContext";
import { IoMdArrowDropdown } from "react-icons/io";

const MobileInput = ({ value, error, onChange }) => {
  const { t } = useTranslation();
  const { data } = useGlobalContext();

  const ref = useRef(null);
  const [show, setShow] = useState(false);
  return (
    <div>
      <label className="block mb-1 text-textColor text-md font-medium">
        {t("mobilePhone")}
      </label>
      <div className="w-full p-3 h-[40px] relative border border-[#9399A3] rounded-xl ">
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
            className="border-none focus:outline-none flex-1"
            value={value}
            onChange={onChange}
          />
          <p dir="ltr">{data?.countries[0]?.phone_prefix_code}</p>
        </div>
        {error ? (
          <div className="my-2 text-sm text-red-600">{error}</div>
        ) : null}
      </div>
    </div>
  );
};

export default MobileInput;
