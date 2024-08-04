import React, { useState, useRef } from "react";
import { CiMenuBurger } from "react-icons/ci";
import langImg from "../../assets/Group 17.svg";
import Sidebar from "./Sidebar";
import { useTranslation } from "react-i18next";
import useClickOutside from "../../hooks/useClickOutside";
import LoginBtn from "../common/navbar/LoginBtn";
import { FaBell } from "react-icons/fa";
import { MdMessage } from "react-icons/md";

const DashboardNavbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { i18n, t } = useTranslation();
  const sidebarRef = useRef(null);
  useClickOutside(sidebarRef, () => setShowSidebar(false));
  const [showNotficationMenu, setShowNotficationMenu] = useState(false);
  const toggleShowNotficationMenu = () =>
    setShowNotficationMenu(!showNotficationMenu);
  const notficationMenuRef = useRef(null);
  useClickOutside(notficationMenuRef, () => setShowNotficationMenu(false));
  const [showChatMenu, setShowChatMenu] = useState(false);
  const toggleShowChatMenu = () => setShowChatMenu(!showChatMenu);
  const chatMenuRef = useRef(null);
  useClickOutside(chatMenuRef, () => setShowChatMenu(false));
  return (
    <>
      <div className="w-full  border h-[80px] flex items-center">
        <div className="container mx-auto px-8">
          <div className="w-full flex items-center justify-between ">
            <div className="flex items-center gap-1 ">
              <CiMenuBurger
                size={20}
                className=" cursor-pointer lg:hidden"
                onClick={() => setShowSidebar(true)}
              />
              <div className="flex items-center gap-1">
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => {
                    window.location.reload();
                    i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar");
                  }}
                >
                  <p className="text-xs md:text-sm lg:text-base">
                    {i18n.language === "ar" ? t("en") : t("ar")}
                  </p>
                  <img src={langImg} alt="" className="w-6 lg:w-10" />
                </div>
              </div>
              <div
                onClick={toggleShowNotficationMenu}
                ref={notficationMenuRef}
                className="cursor-pointer relative"
              >
                <div className=" w-6 h-6 md:w-7 md:h-7 lg:w-10 lg:h-10 bg-transparent rounded-[50%] border flex items-center justify-center">
                  <FaBell size={15} className="text-maincolorgreen" />
                  <div
                    className={` absolute top-[35px] ${
                      i18n.language === "ar" ? "right-0" : "left-0"
                    } duration-300 bg-white shadow-lg z-50 rounded-md p-3 text-start ${
                      showNotficationMenu ? "block" : "hidden"
                    }`}
                  >
                    <p
                      className=" cursor-pointer mb-2"
                      onClick={() => setShowNotficationMenu(false)}
                    >
                      dsfsddfsd
                    </p>
                    <p
                      className=" cursor-pointer"
                      onClick={() => setShowNotficationMenu(false)}
                    >
                      dsfsddfsd
                    </p>
                  </div>
                </div>
              </div>
              <div
                onClick={toggleShowChatMenu}
                ref={chatMenuRef}
                className="cursor-pointer relative"
              >
                <div className=" w-6 h-6 md:w-7 md:h-7 lg:w-10 lg:h-10 bg-transparent rounded-[50%] border flex items-center justify-center">
                  <MdMessage size={15} className="text-maincolorgreen" />
                  <div
                    className={` absolute top-[35px] ${
                      i18n.language === "ar" ? "right-0" : "left-0"
                    } duration-300 bg-white shadow-lg z-50 rounded-md p-3 text-start ${
                      showChatMenu ? "block" : "hidden"
                    }`}
                  >
                    <p
                      className=" cursor-pointer mb-2"
                      onClick={() => setShowNotficationMenu(false)}
                    >
                      dsfsddfsd
                    </p>
                    <p
                      className=" cursor-pointer"
                      onClick={() => setShowNotficationMenu(false)}
                    >
                      dsfsddfsd
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <LoginBtn bg="bg-[#e7ebe7]" />
          </div>
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 w-[90%] h-screen duration-300 lg:hidden ${
          showSidebar ? "right-0" : "right-[-300%]"
        }`}
      >
        <Sidebar isMobileView={true} setShowSidebar={setShowSidebar} />
      </div>
    </>
  );
};

export default DashboardNavbar;
