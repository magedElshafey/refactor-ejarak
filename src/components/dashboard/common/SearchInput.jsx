import React from "react";
import { useTranslation } from "react-i18next";
import { CiSearch } from "react-icons/ci";

const SearchInput = ({ onSearchChange }) => {
    const { t, i18n } = useTranslation();
    return (
        <div className="relative w-fit">
            <CiSearch
                size={22}
                className={`text-[#7A8499] absolute top-[28%] ${i18n.language === "ar" ? " left-2" : "right-2"}`}
            />
            <input
                // onChange={onSearchChange}
                type="text"
                placeholder={t("Search")}
                className="xl:w-[370px] lg:w-[380px] md:w-[280px] py-3 px-3 outline-none rounded-xl border border-[#7A8499]  text-[#26336a]"
                onChange={(e) => {
                    onSearchChange && onSearchChange(e.target.value);
                }}
            />
        </div>
    )
};

export default SearchInput;