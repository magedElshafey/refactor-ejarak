import React, { useState, useRef, useEffect } from "react";
import { MdOutlineMessage } from "react-icons/md";
import { useTranslation } from "react-i18next";
import useClickOutside from "../../../hooks/useClickOutside";
import { useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { fetchUserNamePhoto } from "../../../components/chat/SupportChat";
import fetchContacts from "../../../services/get/fetchContacts";
export const formatNumbersBaseTwo = (number) => {
  try {
    number = parseInt(number);
    return number > 9 ? `${number}` : `0${number}`;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const formatHours = (hours) => {
  try {
    hours = parseInt(hours);
    let base12 = hours % 12;
    if (base12 === 0) {
      base12 = 12;
    }
    return formatNumbersBaseTwo(base12);
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getAmOrPm = (number, language) => {
  try {
    number = parseInt(number);
    return number > 11 ? "PM" : "AM";
  } catch (e) {
    console.error(e);
    return null;
  }
};
const NotificationItem = ({ messages, userId, onOpenLink }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const { data: user, isLoading } = useQuery(
    ["userNamePhoto", userId],
    () => fetchUserNamePhoto(userId),
    {
      staleTime: "Infinity",
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: false,
    }
  );
  const lastMessage = messages[messages.length - 1];
  const [picLoading, setPicLoading] = useState(true);

  return (
    <Link
      to={`/website/chat/${userId || ""}`}
      onClick={() => {
        onOpenLink();
      }}
    >
      <div className="w-full py-1 rounded-lg flex gap-2 px-2 hover:bg-gray-100 cursor-pointer">
        {picLoading && (
          <div className="h-10 w-10 bg-slate-300 rounded-full overflow-hidden animate-pulse" />
        )}
        <img
          src={`${user?.photo_url}`}
          alt="receiver"
          className={`h-10 w-10 rounded-full ${
            picLoading ? "hidden" : "block"
          }`}
          onLoad={() => {
            setPicLoading(false);
          }}
        />

        <div className="flex flex-col gap-1 max-w-[60%] w-full">
          <p className="font-bold text-black">
            {isLoading ? t("loading") : user?.name}
          </p>
          <p className="text-sm overflow-hidden whitespace-nowrap text-ellipsis">
            {isLoading ? t("loading") : lastMessage.message}
          </p>
        </div>
        <div className="text-xs flex flex-col [&>*]:flex-1 gap-1">
          <div className="flex-2 text-md bg-[#00AA4B] w-6 py-1 mx-auto rounded-[50%] text-center text-white">
            {messages.length}
          </div>
          <div className="flex flex-col items-center justify-center text-[#4D5F65]">
            <p>
              {lastMessage?.date?.toLocaleDateString(
                language === "ar" ? language : `${language}-uk`
              )}
            </p>
            <p>
              {`${formatHours(
                lastMessage?.date?.getHours()
              )} : ${formatNumbersBaseTwo(lastMessage?.date?.getMinutes())} ${t(
                getAmOrPm(lastMessage?.date?.getHours())
              )}`}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};
export const refactorContactsAsNotification = async (userId) => {
  const contacts = await fetchContacts(userId);

  const obj = {};
  contacts.forEach((contact) => {
    if (contact.unseen) {
      const contactArr = new Array(parseInt(contact.unseen)).fill(0);
      contactArr[contactArr.length - 1] = {
        message: contact.message,
        date: new Date(Date.parse(contact.time)),
      };
      obj[contact?.otherParty?.id] = contactArr;
    }
  });

  return obj;
};
export const MessagesListMenu = ({ closeMenu = () => null, className }) => {
  // Global State ==========================
  const loggedUser = useSelector((state) => state?.authSlice?.userData);
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  // Fetching State ========================
  const { data: notifications, isLoading } = useQuery(
    ["notifications", "messages"],
    () => refactorContactsAsNotification(loggedUser?.id),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    }
  );

  return (
    <div
      className={`${className} absolute top-full left-[50%] -translate-x-[50%] py-2 min-h-24 max-h-96 flex flex-col gap-1 w-80 bg-white border rounded-xl overflow-y-auto z-10`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="px-4 flex justify-between text-sm text-[#4D5F65]">
        <p>{t("chats")}</p>
        <p>
          <Link to={"/website/chat/"} onClick={() => closeMenu()}>
            {t("all")}
          </Link>
        </p>
      </div>
      {isLoading ? (
        <div className="h-30 w-full flex justify-center items-center">
          <FaSpinner size={20} className="text-maincolorgreen animate-spin" />
        </div>
      ) : (
        <div className="flex flex-col flex-1 gap-4 py-2">
          {Object.keys(notifications).length ? (
            Object.keys(notifications)
              .sort((userA, userB) => {
                try {
                  const userAlatestMessage =
                    notifications[userA][notifications[userA].length - 1];
                  const userBlatestMessage =
                    notifications[userB][notifications[userB].length - 1];
                  if (userBlatestMessage.date >= userAlatestMessage.date) {
                    return 1;
                  } else {
                    return -1;
                  }
                } catch {
                  return 0;
                }
              })
              .map((userId) => {
                return (
                  <NotificationItem
                    key={userId}
                    userId={userId}
                    messages={notifications?.[userId]}
                    onOpenLink={() => {
                      queryClient.setQueryData(
                        ["notifications", "messages"],
                        (oldNotifications) => {
                          const newNotifications = { ...oldNotifications };
                          delete newNotifications[userId];
                          return newNotifications;
                        }
                      );
                      closeMenu();
                    }}
                  />
                );
              })
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <p>{t("noNewMessages")}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const ChatMenu = ({ bg, isDashboard }) => {
  const loggedUser = useSelector((state) => state?.authSlice?.userData);
  // local states =================
  const { data: notifications, isLoading } = useQuery(
    ["notifications", "messages"],
    () => refactorContactsAsNotification(loggedUser?.id),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    }
  );

  //derived values ====================
  const messagesCount = Object.values(notifications || {}).reduce(
    (previous, current) => previous + current.length,
    0
  );
  const closeMenu = () => setMenuActive(false);
  const [menuActive, setMenuActive] = useState(false);
  const menuRef = useRef(null);
  useClickOutside(menuRef, closeMenu);

  return (
    <>
      {isDashboard ? (
        <div
          onClick={() => setMenuActive(!menuActive)}
          ref={menuRef}
          className="cursor-pointer relative"
        >
          <div className="w-10 h-10 rounded-[50%] flex items-center justify-center border border-slate-300 text-maincolorgreen">
            <MdOutlineMessage size={20} />
            {messagesCount > 0 && !menuActive && (
              <div className="absolute -bottom-[20%] -left-[20%] bg-maincolorgreen text-white w-6 h-6 flex items-center justify-center rounded-full">
                <p>{messagesCount}</p>
              </div>
            )}
          </div>
          {menuActive && (
            <MessagesListMenu closeMenu={() => setMenuActive(false)} />
          )}
        </div>
      ) : (
        <div
          onClick={() => setMenuActive(!menuActive)}
          ref={menuRef}
          className="cursor-pointer relative"
        >
          <div
            className={`w-8 h-8 md:w-12 md:h-12 md:p-2 flex items-center rounded-md justify-center md:border mx-1 md:mx-0 ${
              bg
                ? `${bg} text-slate-500`
                : "md:border-white text-white bg-transparent"
            }`}
          >
            <MdOutlineMessage size={20} />
            {messagesCount > 0 && !menuActive && (
              <div className="absolute -bottom-[20%] -left-[20%] bg-maincolorgreen text-white w-6 h-6 flex items-center justify-center rounded-full">
                <p>{messagesCount}</p>
              </div>
            )}
          </div>
          {menuActive && (
            <MessagesListMenu closeMenu={() => setMenuActive(false)} />
          )}
        </div>
      )}
    </>
  );
};

export default ChatMenu;
