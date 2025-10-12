import React, { useState, useEffect } from "react";
import { CiMenuBurger } from "react-icons/ci";
import langImg from "../../assets/Group 17.svg";
import { useTranslation } from "react-i18next";
import LoginBtn from "../common/navbar/LoginBtn";
import NotficationMenu from "../common/navbar/NotficationMenu";
import { IoClose } from "react-icons/io5";
import Logo from "../../components/common/Logo";
import logo from "../../assets/logobglight.png";
import { dashboardLinks } from "../../data/data";
import { NavLink, useLocation } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { changeLanguage } from "../../services/post/changeLangauge";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import ChatMenu from "../common/navbar/ChatMenu";
import useListenToMessages from "../../hooks/useListenToMessages.js";
import echo from "../../echo.js";
import notificationSound from "../../assets/sounds/notification.wav";
import { useQueryClient } from "react-query";
const notificationAudio = new Audio(notificationSound);
const DashboardNavbar = () => {
  const { ejarakLogin } = useSelector((state) => state.authSlice);
  const { i18n, t } = useTranslation();
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const loggedUser = useSelector((state) => state?.authSlice?.userData);
  const queryClient = useQueryClient();

  const { pathname } = useLocation();
  const handleActiveIndexClick = (index, item) => {
    if (item.list.length > 0) {
      setActiveIndex(index);
    } else {
      setActiveIndex(null);
    }
  };
  const handleClick = (item) => {
    if (item.list.length) {
      return;
    } else {
      setShowSidebar(false);
    }
  };
  const { mutate } = useMutation((v) => changeLanguage(v), {
    onSuccess: (data) => {
      if (data?.data?.status) {
        window.location.reload();
      }
    },
  });
  const handleChangeLang = () => {
    localStorage.setItem(
      "lang",
      JSON.stringify(i18n.language === "ar" ? "en" : "ar")
    );
    const data = {
      language: i18n.language === "ar" ? "en" : "ar",
    };
    mutate(data);
    if (!ejarakLogin) {
      window.location.reload();
    } else {
      return;
    }
  };
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
    <>
      <div className="w-full  flex items-center lg:mt-8 mb-2 bg-[#f7f7f7] rounded-lg p-3">
        <div className="w-full container mx-auto lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                {/**menu for mobile view to show sidebar*/}
                <div className="block lg:hidden">
                  <CiMenuBurger
                    size={20}
                    className=" cursor-pointer"
                    onClick={() => setShowSidebar(true)}
                  />
                </div>
                {/**lang menu*/}
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
                {/**notfication*/}
                <NotficationMenu isDashboard={true} />
                <ChatMenu isDashboard={true} />
              </div>
            </div>
            <LoginBtn bg="bg-transparent" isDashboard={true} />
          </div>
        </div>
      </div>
      <div
        className={`fixed h-screen top-0 duration-300 z-50 w-[90%] bg-gray-200 p-3 ${
          showSidebar ? "right-0" : "right-[-300%]"
        }`}
      >
        <IoClose
          size={30}
          className=" cursor-pointer mb-8"
          onClick={() => setShowSidebar(false)}
        />
        <div className="my-8 w-full flex justify-center">
          <Logo img={logo} />
        </div>
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
                to={item?.list?.length ? item?.list[0].path : item?.path}
                onClick={() => handleClick(item)}
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
                        onClick={() => setShowSidebar(false)}
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
    </>
  );
};

export default DashboardNavbar;
/**
 *   <div className="container mx-auto px-8">
          <div className="w-full flex items-center justify-between ">
            <div className="flex items-center gap-1">
              <div className="block lg:hidden">
                <Logo img={logo} />
              </div>
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
            <NotficationMenu isDashboard={true} />

            <LoginBtn bg="bg-transparent" isDashboard={true} />
          </div>
        </div>
 */
