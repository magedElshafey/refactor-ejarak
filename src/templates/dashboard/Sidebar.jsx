import React, { useState, useRef, useEffect } from "react";
import Logo from "../../components/common/Logo";
import logo from "../../assets/logobglight.png";
import { dashboardLinks } from "../../data/data";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import useClickOutside from "../../hooks/useClickOutside";
const Sidebar = ({ isMobileView, setShowSidebar }) => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="w-[90%] lg:w-[250px] h-screen bg-[#f6f5f5] border ">
      {isMobileView ? (
        <IoMdClose
          size={20}
          className=" cursor-pointer mb-3 "
          onClick={() => setShowSidebar(false)}
        />
      ) : null}
      <div className="w-full flex justify-center mt-8 mb-5">
        <Logo img={logo} />
      </div>

      <ul>
        {dashboardLinks?.map((item, index) => (
          <li
            key={index}
            className="relative"
            onClick={() => {
              setActiveIndex(index);
              setShowMenu(!showMenu);
            }}
          >
            <NavLink
              className="dashboard p-3 flex items-center justify-between duration-300 hover:text-maincolorgreen mb-2"
              to={item.list.length ? item.list[0].path : item.path}
            >
              <div className="flex items-center gap-2">
                <p>{item.icon}</p>
                <p>{t(item.title)}</p>
              </div>
              {item.list.length ? (
                <IoIosArrowDown size={20} className="text-textColor" />
              ) : null}
            </NavLink>
            {item.list?.length ? (
              <ul
                className={` w-full bg-white p-3 rounded-lg shadow-xl z-[1000] ${
                  activeIndex === index && showMenu ? "block" : "hidden"
                }`}
              >
                {item.list.map((l, i) => (
                  <NavLink
                    to={l.path}
                    key={i}
                    className={`block mb-3 font-semibold dashboard duration-300 w-fit `}
                  >
                    {t(l.title)}
                  </NavLink>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
