import React, { useRef, useState } from "react";
import { navLinks } from "../../../data/data";
import logo from "../../../assets/logo footer.png";
import logo2 from "../../../assets/logobglight.png";
import LangMenu from "./LangMenu";
import NavLinks from "./NavLinks";
import ChatMenu from "./ChatMenu";
import { PiListMagnifyingGlassFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { handleOpenFilter, closeFilter } from "../../../store/filterSlice";
import useClickOutside from "../../../hooks/useClickOutside";
import Filter from "../../../components/common/filter/Filter";
import LoginBtn from "./LoginBtn";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
const Navbar = ({ bg }) => {
  const dispatch = useDispatch();
  const filterRef = useRef(null);
  const { i18n } = useTranslation();
  const { isLogin } = useSelector((state) => state.authSlice);
  const { openFilter } = useSelector((state) => state.filterSlice);
  useClickOutside(filterRef, () => dispatch(closeFilter()));
  const [showSidebar, setShowSidebar] = useState();
  const sidebarRef = useRef(null);

  const { pathname } = useLocation();
  return (
    <div className="container mx-auto px-8  pt-5">
      <div className=" hidden lg:block">
        <div className="flex items-center justify-between gap-4">
          <div
            className={`rounded-lg p-4 flex-1 ${
              bg ? "" : "border border-white"
            }`}
          >
            <NavLinks navLinks={navLinks} logo={bg ? logo2 : logo} bg={bg} />
          </div>
          <LangMenu bg={bg} />
          {isLogin ? (
            <>
              <ChatMenu bg={bg} />
            </>
          ) : null}
          {isLogin ? (
            <>
              <ChatMenu bg={bg} />
            </>
          ) : null}
          <LoginBtn bg={bg} />
        </div>
      </div>
      <div className="lg:hidden">
        <div className="flex items-center justify-between gap-8">
          <div className="flex items-center gap-1 ">
            <IoMdMenu
              size={40}
              className={`cursor-pointer ${
                bg ? `text-slate-500` : "text-white"
              }`}
              onClick={() => setShowSidebar(true)}
            />
            <LangMenu bg={bg} />
            {isLogin ? (
              <>
                <ChatMenu bg={bg} />
              </>
            ) : null}
            {isLogin ? (
              <>
                <ChatMenu bg={bg} />
              </>
            ) : null}
          </div>
          <div className="flex items-center gap-1">
            <LoginBtn bg={bg} />
            {pathname === "/" ||
            pathname === "/website/near-realstates" ||
            pathname === "/website/all-realstates" ? (
              <div ref={filterRef}>
                <PiListMagnifyingGlassFill
                  size={40}
                  className={`cursor-pointer ${
                    bg ? `text-slate-500` : "text-white"
                  }`}
                  onClick={() => dispatch(handleOpenFilter())}
                />
                <div
                  className={`fixed top-0 duration-300 w-[90%] h-screen overflow-y-scroll z-50 ${
                    openFilter ? "left-0" : "left-[-350%]"
                  }`}
                >
                  <Filter
                    bg="bg-white"
                    rounded="rounded-none"
                    showRealStateBtn={true}
                    mobileVieow={true}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div
          ref={sidebarRef}
          className={`fixed top-0 bg-white  duration-300 w-[90%] h-screen overflow-y-scroll z-50 ${
            showSidebar ? "right-0" : "right-[-350%]"
          }`}
        >
          <div className="p-3">
            <IoMdClose
              size={20}
              className="mb-4 cursor-pointer"
              onClick={() => setShowSidebar(false)}
            />
            {navLinks.map((item, index) => (
              <NavLink
                onClick={() => setShowSidebar(false)}
                to={item.path}
                key={index}
                className={`w-fit flex items-center gap-2 mb-4 home`}
              >
                {item.icon}
                <p>{i18n.language === "ar" ? item.arTitle : item.enTitle}</p>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
/**
 *    <div className="flex items-center justify-between gap-4">
        <div
          className={`hidden  lg:block rounded-lg p-4 flex-1 ${
            bg ? "" : "border border-white"
          } `}
        >
          <NavLinks navLinks={navLinks} logo={bg ? logo2 : logo} bg={bg} />
        </div>

        <LangMenu bg={bg} />
        {isLogin ? (
          <>
            <ChatMenu bg={bg} />
          </>
        ) : null}
        {isLogin ? (
          <>
            <ChatMenu bg={bg} />
          </>
        ) : null}

        <LoginBtn />

        <div ref={filterRef} className="lg:hidden">
          <PiListMagnifyingGlassFill
            size={40}
            className="text-white cursor-pointer"
            onClick={() => dispatch(handleOpenFilter())}
          />
          <div
            className={`fixed top-0 duration-300 w-[90%] h-screen overflow-y-scroll z-50 ${
              openFilter ? "left-0" : "left-[-350%]"
            }`}
          >
            <Filter
              bg="bg-white"
              rounded="rounded-none"
              showRealStateBtn={true}
              mobileVieow={true}
            />
          </div>
        </div>
      </div>
 */
