import React from "react";
import { FaEye, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
const TableProperties = ({
  hasEdit,
  hasDelete,
  hasView,
  editAction,
  deleteAction,
  viewAction,
  disabled,
}) => {
  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      {hasView ? (
        <FaEye size={20} className=" cursor-pointer" onClick={viewAction} />
      ) : null}
      {hasEdit ? (
        <FaEdit size={20} className=" cursor-pointer" onClick={editAction} />
      ) : null}
      {hasDelete ? (
        <MdDelete
          size={20}
          className={`${
            disabled ? " opacity-20" : "cursor-pointer opacity-100"
          }`}
          onClick={deleteAction}
        />
      ) : null}
    </div>
  );
};

export default TableProperties;
/**
 * import { useRef, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import useClickOutside from "../../../../hooks/useClickOutside";
import { useTranslation } from "react-i18next";
const TableProperties = ({ items, row }) => {
    const menuRef = useRef();
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === "ar";
    const [openMenu, setOpenMenu] = useState(false);
    const handleToggle = () => {
        setOpenMenu(!openMenu);
    };

    useClickOutside(menuRef, () => setOpenMenu(false));
    const handleClick = (item, event) => {
        setOpenMenu(false);
        item.onClick(event);
    };

    return (
        <div className="relative w-fit text-center mx-auto" ref={menuRef}>
            <BiDotsVerticalRounded
                onClick={handleToggle}
                size={20}
                className=" text-darkGray dark:text-white cursor-pointer  mx-auto"
            />
            <ul
                className={`bg-white dark:bg-darkGray rounded-xl w-fit py-2 px-3 absolute  overflow-y-auto ${isArabic ? "left-[30px]" : "right-[-70px]"
                    } p-1 translate-x-[-50%] top-[25px] shadow-2xl z-50 duration-300 ${openMenu ? "block" : "hidden"
                    }`}
            >
                {items(row)?.map((item, index) => {
                    return (
                        <li
                            onClick={(e) => handleClick(item, e)}
                            key={index}
                            className="my-3 flex items-center justify-start gap-2 cursor-pointer"
                        >
                            {item.icon}
                            <p className=" cursor-pointer">{t(item.title)}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default TableProperties;

 */
