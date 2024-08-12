import React, { useState, useRef, useEffect } from "react";
import Logo from "../../components/common/Logo";
import logo from "../../assets/logobglight.png";
import { dashboardLinks } from "../../data/data";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
const Sidebar = ({ isMobileView, setShowSidebar }) => {
  const { userData } = useSelector((state) => state.authSlice);
  const role = userData?.account?.type;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  // Close the menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
        setActiveIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleLinkClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index); // Toggle menu
    setShowMenu(index !== activeIndex); // Show/hide submenu
  };

  const filteredLinks = dashboardLinks.filter((link) =>
    link.role.includes(role)
  );
  return (
    <div className="w-[90%] lg:w-[250px] h-screen bg-[#f6f5f5] border overflow-y-auto ">
      {isMobileView ? (
        <IoMdClose
          size={20}
          className=" cursor-pointer mb-3 "
          onClick={() => setShowSidebar(false)}
        />
      ) : null}
      <div className="w-full flex justify-center my-5">
        <Logo img={logo} />
      </div>
      <ul ref={menuRef}>
        {filteredLinks?.map((link, index) => (
          <li
            onClick={() => handleLinkClick(index)}
            key={index}
            className="relative cursor-pointer"
          >
            <NavLink
              to={
                link.list.length && activeIndex === index
                  ? null
                  : link.list.length && activeIndex !== index
                  ? link.list[0].path
                  : link.path
              }
              className="dashboard p-3 flex items-center justify-between duration-300 hover:text-maincolorgreen "
            >
              <div className="flex items-center gap-2">
                <p>{link.icon}</p>
                <p>{t(link.title)}</p>
              </div>
              {link.list.length ? (
                <IoIosArrowDown size={20} className="text-textColor" />
              ) : null}
            </NavLink>
            {link.list.length && activeIndex === index && showMenu ? (
              <ul className="bg-white p-2 w-full rounded-lg shadow-xl z-[150]">
                {link.list.map((l, i) => (
                  <NavLink
                    to={l.path}
                    key={i}
                    className="block mb-2 font-semibold dashboard duration-300 w-fit"
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
/**
 *     <ul ref={menuRef}>
        {filteredLinks?.map((item, index) => (
          <li key={index} className="relative">
            <d
              className="dashboard p-3 flex items-center justify-between duration-300 hover:text-maincolorgreen mb-2 cursor-pointer"
              onClick={() => handleLinkClick(item, index)}
            >
              <div className="flex items-center gap-2">
                <p>{item.icon}</p>
                <p>{t(item.title)}</p>
              </div>
              {item.list.length ? (
                <IoIosArrowDown size={20} className="text-textColor" />
              ) : null}
            </d>
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
 */
