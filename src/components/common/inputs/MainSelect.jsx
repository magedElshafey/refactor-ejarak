import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import useClickOutside from "../../../hooks/useClickOutside";
import { IoMdArrowDropdown } from "react-icons/io";

const MainSelect = ({
  border,
  bg,
  label,
  options,
  onSelect,
  disabled,
  loading,
  value,
  disabledTitle,
}) => {
  const { t, i18n } = useTranslation();
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const toggleShowOptions = () => {
    if (disabled) {
      return;
    } else {
      setShowOptions(!showOptions);
    }
  };
  const optionRef = useRef(null);
  useClickOutside(optionRef, () => setShowOptions(false));
  const handleSelectChange = (option) => {
    setSelectedOption(option.name);
    onSelect(option);
    setShowOptions(false);
  };
  useEffect(() => {
    if (value) {
      setSelectedOption(value);
    } else {
      setSelectedOption("");
      return;
    }
  }, [value]);
  return (
    <div>
      <label className="block mb-1 text-textColor text-md font-medium">
        {t(label)}
      </label>
      <div
        ref={optionRef}
        className="relative cursor-pointer"
        onClick={toggleShowOptions}
      >
        <div
          className={`w-full p-3 rounded-xl flex items-center justify-between  ${
            border ? border : "border border-[#9399A3]"
          } ${bg ? `${bg} border-none` : "bg-white"}`}
        >
          {disabled && disabledTitle ? (
            <p>{t("disabled title")}</p>
          ) : (
            <p>{selectedOption}</p>
          )}
          {!disabled ? (
            <IoMdArrowDropdown size={30} className="text-end" />
          ) : null}
        </div>
        <div
          className={`absolute top-[50px] w-full duration-300 bg-white border border-slate-400 rounded-lg shadow-lg z-40 text-start ${
            i18n.language === "ar" ? "right-0" : "left-0"
          } ${showOptions ? "block" : "hidden"} `}
        >
          {loading ? (
            <div className="w-12 h-12 border-4  border-maincolorgreen border-dashed rounded-full animate-spin text-center p-2 mx-auto"></div>
          ) : options.length ? (
            options.map((item) => (
              <p
                key={item.id}
                onClick={() => handleSelectChange(item)}
                className=" p-2 cursor-pointer rounded-[13px] hover:bg-[#BDC7BC4D]"
              >
                {item.name}
              </p>
            ))
          ) : (
            <p className="text-center">{t("no data")}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainSelect;
