import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import logo from "../../assets/logobglight.png";
import Logo from "../../components/common/Logo";
import { dashboardLinks } from "../../data/data";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

const DashboardSidebar = () => {
  const { i18n, t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // const handleActiveIndexClick = (index, item) => {
  //   if (item.list.length > 0) {
  //     setActiveIndex(index);
  //   } else {
  //     setActiveIndex(null);
  //   }
  // };
  // const handleActiveIndexClick = (index, item) => {
  //   // إذا كانت القائمة مفتوحة، أغلقها
  //   if (activeIndex === index) {
  //     setActiveIndex(null);
  //   } else {
  //     // إذا كانت القائمة تحتوي على روابط فرعية، افتحها وانتقل لأول رابط
  //     if (item.list.length > 0) {
  //       setActiveIndex(index);
  //     } else {
  //       // إذا لم تكن تحتوي على روابط فرعية، فقط أغلق القائمة
  //       setActiveIndex(null);
  //     }
  //   }
  // };
  // const handleActiveIndexClick = (index, item) => {
  //   // إذا كانت القائمة المفتوحة هي نفس القائمة، أغلقها
  //   if (activeIndex === index) {
  //     setActiveIndex(null);
  //   } else {
  //     // إذا كانت القائمة تحتوي على روابط فرعية، افتح القائمة وانتقل لأول عنصر
  //     if (item.list.length > 0) {
  //       setActiveIndex(index);
  //       // التنقل لأول عنصر فقط إذا كانت القائمة مغلقة
  //       navigate(item.list[0].path);
  //     } else {
  //       // إذا لم تكن تحتوي على روابط فرعية، فقط أغلق القائمة
  //       setActiveIndex(null);
  //     }
  //   }
  // };
  const handleActiveIndexClick = (index, item) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
    if (item?.list?.length) {
    } else {
      navigate(item?.path);
    }
  };
  return (
    <>
      <div className="hidden lg:block">
        <div
          className={`fixed ${
            i18n.language === "ar" ? "right-0" : "left-0"
          } top-0 min-h-screen  bg-[#f7f7f7] rounded-lg w-[150px] lg:w-[250px] overflow-y-scroll flex  justify-center`}
        >
          <div>
            <div className="my-8 w-full flex justify-center">
              <Logo img={logo} />
            </div>
            <ul className="w-full">
              {dashboardLinks?.map((item, index) => (
                <li
                  onClick={() => handleActiveIndexClick(index, item)}
                  key={index}
                  className="mb-2 relative "
                >
                  <div
                    className={`flex items-center cursor-pointer  w-full p-2 ${
                      activeIndex === index ? "dash" : null
                    } justify-between`}
                  >
                    <div className="flex items-center gap-4">
                      <p>{item?.icon}</p>
                      <p>{t(item.title)}</p>
                    </div>
                    {item?.list?.length ? <IoIosArrowDown size={25} /> : null}
                  </div>
                  {item?.list?.length ? (
                    <ul
                      className={` duration-300  ${
                        activeIndex === index ? "block" : "hidden"
                      }   bg-white shadow-xl rounded-lg p-3 w-full`}
                    >
                      {item?.list?.map((link, indedTwo) => (
                        <li key={indedTwo} className="mb-3">
                          <NavLink
                            to={link.path}
                            className={
                              "flex items-center gap-3 list cursor-pointer"
                            }
                          >
                            <p>{link?.icon}</p>
                            <p>{t(link?.title)}</p>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
/**
 *   <div
          className={`fixed ${
            i18n.language === "ar" ? "right-0" : "left-0"
          } h-screen  bg-[#f7f7f7] rounded-lg w-[150px] lg:w-[250px] overflow-y-scroll flex  justify-center`}
        >
          <div>
           
            <ul className="w-full">
              {dashboardLinks?.map((item, index) => (
                <li
                  onClick={() => handleActiveIndexClick(index, item)}
                  key={index}
                  className="mb-2 relative"
                >
                  <NavLink
                    className={`flex items-center  w-full p-2 ${
                      item?.list?.length ? null : "dash"
                    } justify-between`}
                    to={item?.list?.length ? null : item?.path}
                  >
                    <div className="flex items-center gap-4">
                      <p>{item?.icon}</p>
                      <p>{t(item.title)}</p>
                    </div>
                    {item?.list?.length ? <IoIosArrowDown size={25} /> : null}
                  </NavLink>
                  {item?.list?.length ? (
                    <ul
                      className={` duration-300  ${
                        activeIndex === index &&
                        item.list.some((link) => pathname.includes(link.path))
                          ? "block"
                          : "hidden"
                      }   bg-white shadow-xl rounded-lg p-3 w-full`}
                    >
                      {item?.list?.map((link, indedTwo) => (
                        <li key={indedTwo} className="mb-3">
                          <NavLink
                            to={link.path}
                            className={"flex items-center gap-3 list"}
                          >
                            <p>{link?.icon}</p>
                            <p>{t(link?.title)}</p>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
 */
