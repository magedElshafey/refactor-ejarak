import React, { useRef, useState, useEffect } from "react";
import { navLinks } from "../../../data/data";
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
import NotficationMenu from "./NotficationMenu";
import { useNavigate } from "react-router-dom";
import echo from "../../../echo";
import notificationSound from "../../../assets/sounds/notification.wav";
import { useQueryClient } from "react-query";
import useListenToMessages from "../../../hooks/useListenToMessages";
import Sidebar from "../../dashboard/Sidebar";
import ejarakWhite from "../../../assets/ejark white.png";
import ejarakGreen from "../../../assets/ejark green.png";
import Logo from "../../../components/common/Logo";
const notificationAudio = new Audio(notificationSound);

const Navbar = ({ bg, dashboard }) => {
  // ================== global states =============================
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const { ejarakLogin, userData } = useSelector((state) => state.authSlice);
  const { openFilter } = useSelector((state) => state.filterSlice);
  const loggedUser = useSelector((state) => state?.authSlice?.userData);
  const auth = useSelector((state) => state.authSlice);
  const { pathname } = useLocation();
  const queryClient = useQueryClient();

  // ================== local states =============================
  const [showSidebar, setShowSidebar] = useState();
  const sidebarRef = useRef(null);
  const filterRef = useRef(null);
  // dashboard side bar
  const [showDashboardSidBar, setShowDashboardSidebar] = useState(false);
  const handleBurgerMenuClick = () => {
    if (dashboard) {
      setShowDashboardSidebar(true);
    } else {
      setShowSidebar(true);
    }
  };
  useClickOutside(filterRef, () => dispatch(closeFilter()));
  const isLogin = auth?.ejarakLogin;
  const navigate = useNavigate();
  const type = auth?.userData?.account?.type || null;
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setShowSidebar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const addNotification = (newNotification) => {
    const newNotifications = [
      {
        ...newNotification,
        description: newNotification.notification,
        seen: Boolean(newNotification.seen),
        date: new Date(Date.parse(newNotification.time)),
        created_at: new Date(Date.parse(newNotification.time)),
        path: newNotification.realty_id
          ? `/user-ad-details/${newNotification.realty_id}`
          : "",
        id: newNotification.notification_id,
      },
    ];
    return setNotifications(newNotifications, +1, true);
  };

  useListenToMessages();

  // Subscribing to the Event Manager.
  useEffect(() => {
    if (loggedUser) {
      echo
        .private(`privateNotification.${loggedUser?.id}`)
        .listen(".private-notification", (e) => {
          //play the sound of the notification.
          notificationAudio.play().catch((e) => {
            if (e.name === "NotAllowedError") {
              // handle autoplay errors, for reference https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide
              return;
            }
            throw new Error("unexpected behaviour from the audio player.");
          });
          addNotification(e);
        });
    }

    return () => {
      echo
        .private(`privateNotification.${loggedUser?.id}`)
        .stopListening(".private-notification");
    };
  }, [loggedUser]);

  const setNotifications = (notifications, unseen = 0, isNew = false) => {
    queryClient.setQueryData("all-notfications", (response) => {
      const results = response?.data?.data || [];
      const newNotifications = isNew
        ? [...notifications, ...results]
        : notifications;
      const oldUnseen = response?.data?.un_seen || 0;
      const newData = {
        ...response,
        data: {
          ...response.data,
          data: newNotifications,
          un_seen: oldUnseen + unseen,
        },
      };
      return newData;
    });
  };

  return (
    <div className="container mx-auto px-8  pt-5">
      <div className="hidden lg:block">
        <div className="flex items-center justify-between gap-4">
          <div
            className={`rounded-lg p-4 flex-1 ${
              bg ? "" : "border border-white"
            }`}
          >
            {dashboard ? null : (
              <NavLinks
                navLinks={navLinks}
                logo={bg ? ejarakGreen : ejarakWhite}
                bg={bg}
              />
            )}
          </div>
          <LangMenu bg={bg} />
          {ejarakLogin &&
          (userData?.account?.type === "owner" ||
            userData?.account?.type === "tenant" ||
            userData?.account?.type === "customer_service") ? (
            <>
              <ChatMenu bg={bg} />
            </>
          ) : null}
          {ejarakLogin ? (
            <>
              <NotficationMenu bg={bg} />
            </>
          ) : null}
          <LoginBtn bg={bg} />
        </div>
      </div>

      <div className="lg:hidden">
        <div className="flex items-center justify-between ">
          <div className="flex items-center ">
            <IoMdMenu
              size={30}
              className={`cursor-pointer ${
                bg ? `text-slate-500` : "text-white"
              }`}
              onClick={handleBurgerMenuClick}
            />

            <LangMenu bg={bg} />
            {ejarakLogin ? (
              <>
                <NotficationMenu bg={bg} />
              </>
            ) : null}
            {ejarakLogin &&
            (userData.account?.type === "owner" ||
              userData.account?.type === "tenant" ||
              userData.account?.type === "customer_service") ? (
              <>
                <ChatMenu bg={bg} />
              </>
            ) : null}
          </div>
          <Logo img={bg ? ejarakGreen : ejarakWhite} />
          <div className="flex items-center gap-2">
            {pathname === "/" ||
            pathname === "/website/near-realstates" ||
            pathname === "/website/all-realstates" ? (
              dashboard ? null : (
                <div ref={filterRef}>
                  <PiListMagnifyingGlassFill
                    size={30}
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
              )
            ) : null}
            <LoginBtn bg={bg} />
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
                onClick={(e) => {
                  item.onClick && item.onClick(e, isLogin, navigate, type);
                  setShowSidebar(false);
                }}
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

        <Sidebar
          setShowDashboardSidebar={setShowDashboardSidebar}
          isMobileView={true}
          showDashboardSidBar={showDashboardSidBar}
        />
      </div>
    </div>
  );
};

export default Navbar;
