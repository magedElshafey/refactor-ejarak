import React from "react";
import Logo from "../../components/common/Logo";
import logo from "../../assets/logobglight.png";
import { dashboardLinks } from "../../data/data";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const Sidebar = ({ isMobileView, setShowSidebar }) => {
  const { t } = useTranslation();
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
          <li key={index}>
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
