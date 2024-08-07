import React, { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import fetchUserNamePhoto from "../../services/get/fetchUserNamePhoto";
import fetchMessages from "../../services/get/fetchMessages";
import sendMessageAsync from "../../services/get/sendMessageAsync";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa6";
import ChatInput from "./ChatInput";
import echo from "../../echo";
import Swal from "sweetalert2";
import getHash from "../../utils/getHash";
const getInitialState = () => {
  return {
    data: [],
    status: "idle",
  };
};

const Message = ({
  message,
  type,
  date,
  sender,
  photo = true,
  status,
  insertDate,
}) => {
  const { i18n, t } = useTranslation();
  function formatDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);

    // Get the current language
    const language = i18n.language;

    // Define options for date and time formatting
    const dateOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    // Format date and time based on the current language
    const formattedDate = dateTime.toLocaleDateString(
      language === "ar" ? "ar-EG" : "en-GB",
      dateOptions
    );
    const formattedTime = dateTime.toLocaleTimeString(
      language === "ar" ? "ar-EG" : "en-GB",
      timeOptions
    );

    // Split time to adjust for period in Arabic if needed
    const [time, period] = formattedTime.split(" ");
    const formattedPeriod =
      period === "AM" && language === "ar"
        ? "ص"
        : period === "PM" && language === "ar"
        ? "م"
        : period.toLowerCase();

    // Rearrange time format if the language is Arabic
    const [hours, minutes] = time.split(":");
    const formattedTimeArabic =
      language === "ar" ? `${minutes}:${hours}` : `${hours}:${minutes}`;

    // Combine date and time with the period
    const formattedDateTime =
      language === "ar"
        ? `${formattedDate} ${formattedTimeArabic} ${formattedPeriod}`
        : `${formattedDate} ${time} ${formattedPeriod}`;

    return formattedDateTime;
  }
  return (
    <div
      className={`w-full flex px-2 gap-2 max-w-[70%] md:max-w-[50%] ${
        insertDate ? "mb-5" : ""
      } ${type === "received" ? "flex-row-reverse self-end" : ""}`}
    >
      <div className="min-w-8 w-8 h-8 md:min-w-10 md:w-10 md:h-10">
        {photo && (
          <img
            src={sender?.pp}
            alt="photoSender"
            className="h-full w-full rounded-full object-fill object-center"
          />
        )}
      </div>
      <div>
        <div
          className={`relative min-h-10 text-wrap py-1 px-1 md:px-3 flex items-center justify-center rounded-lg ${
            type === "sent"
              ? status === "success"
                ? "bg-maincolorgreen text-white"
                : "bg-green-400 text-white"
              : "bg-white"
          }`}
        >
          <p>{message}</p>
          {insertDate && (
            <div
              className={`absolute text-black top-[95%] ${
                i18n.language === "ar"
                  ? type === "sent"
                    ? "right-0"
                    : "left-0"
                  : type === "sent"
                  ? "left-0"
                  : "right-0"
              } w-fit text-nowrap text-xs flex gap-1 mt-2 ${
                type === "received" ? "items-end" : "items-start"
              }`}
            >
              {formatDateTime(date)}
              {/* <p>
                  {date.toLocaleDateString(language, {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
                <p>
                  {`${formatHours(date?.getHours())} : ${formatNumbersBaseTwo(
                    date?.getMinutes()
                  )} ${t(getAmOrPm(date?.getHours()))}`}
                </p> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
const ChatContainer = () => {
  const { id: receiverId } = useParams();
  const { t } = useTranslation();
  const loggedUser = useSelector((state) => state?.authSlice?.userData);

  // local states
  const [messages, setMessages] = useState(getInitialState);
  const [page, setPage] = useState(1);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const chatBoxRef = useRef(null);
  // fetching states
  const { data: receiver, isLoading: receiverLoading } = useQuery(
    ["user-name-photo", receiverId],
    () => fetchUserNamePhoto(receiverId),
    {
      staleTime: "Infinity",
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
  const { mutate: sendMessage } = useMutation(sendMessageAsync, {
    onSuccess(data) {
      setMessages((oldMessages) => {
        const index = oldMessages.data?.findIndex(
          (message) => message?.uuid === data?.uuid
        );
        const newMessages = [
          ...oldMessages.data?.slice(0, index),
          data,
          ...oldMessages.data?.slice(index + 1),
        ];
        return { ...oldMessages, data: newMessages };
      });
    },
    onMutate(messageObj) {
      const newMsg = {
        message: messageObj.text,
        date: new Date(),
        uuid: messageObj.uuid,
        type: "sent",
        status: "pending",
      };
      flushSync(() => {
        setMessages((oldMessages) => {
          const data = [...oldMessages.data, newMsg];
          return {
            ...oldMessages,
            data,
          };
        });
      });
      scrollChatToBottom();
    },
  });

  // Effects

  // fetching the messages initially and when the receiver id changes, clearing the messages just in case there are old messages.
  useEffect(() => {
    setMessages(getInitialState);
    setPage(1);
    if (receiverId) {
      loadMessages(true).then(() => {
        scrollChatToBottom();
      });
    }
  }, [receiverId]);

  // receving new messages from the connection
  useEffect(() => {
    if (loggedUser) {
      echo.private(`chat.${loggedUser?.id}`).listen(".chat_message", (e) => {
        onReplay(e);
      });
    }

    return () => {
      echo.private(`chat.${loggedUser?.id}`).stopListening(".chat_message");
    };
  }, [receiverId]);

  // when a message is recieved, if the user is almost scrolled to bottom, then scroll the chat to the bottom
  useEffect(() => {
    if (
      messages?.data?.[messages?.data?.length - 1]?.type === "received" &&
      scrolledToBottom
    ) {
      scrollChatToBottom();
    }
  }, [messages]);
  // utility functions
  const onReplay = (e) => {
    if (parseInt(e.sender_id) !== parseInt(receiverId)) {
      return;
    }
    const newReplay = {
      type: "received",
      message: e.message,
      date: new Date(Date.parse(`${e.time}Z`)),
    };
    setMessages((oldMessages) => {
      const data = [...oldMessages.data, newReplay];
      return {
        ...oldMessages,
        data,
      };
    });
  };

  const loadMessages = async (initial = false) => {
    setMessages((oldMessages) => ({ ...oldMessages, status: "loading" }));
    const response = await fetchMessages(receiverId, initial ? 1 : page);
    if (!response) {
      Swal.fire({
        icon: "error",
        title: t("somethingWrongHappened"),
      });

      return setMessages((oldMessages) => ({
        ...oldMessages,
        status: "failure",
      }));
    }
    const fetchedMessages =
      response?.messages?.map((message) => ({
        message: message.message,
        type: message.sender_id === loggedUser?.id ? "sent" : "received",
        date: new Date(Date.parse(message?.created_at)),
      })) || [];
    flushSync(() => {
      if (initial) {
        setMessages((oldMessages) => ({
          ...oldMessages,
          data: fetchedMessages,
          status: "success",
        }));
        if (response?.next) {
          setPage(2);
        }
      } else {
        setMessages((oldMessages) => ({
          ...oldMessages,
          data: [...fetchedMessages, ...oldMessages.data],
          status: "success",
        }));
        if (response?.next) {
          setPage((oldPage) => oldPage + 1);
        }
      }

      if (!response?.next) {
        setPage(null);
      }
    });
  };

  const scrollChatToBottom = () => {
    chatBoxRef.current.scroll(0, chatBoxRef.current.scrollHeight);
  };
  return (
    <div className="flex-1 bg-[#f5f7f5] rounded-lg border flex flex-col">
      <div className="w-full bg-[#f4f5f8] py-2 px-4 text-xl border-b min-h-10">
        {receiverLoading ? t("loading") : receiverId ? receiver?.name : ""}
      </div>
      <div
        className="flex flex-col h-full w-full gap-1 pt-4 overflow-y-auto"
        style={{ overflowAnchor: "none" }}
        ref={chatBoxRef}
        onScroll={() => {
          // 80 is an offset, meaning that if the user is scrolled to the bottom with an offset of 80, then the user is considered to be scrolled to the bottom of the chat conatiner
          setScrolledToBottom(
            chatBoxRef.current.scrollTop +
              chatBoxRef.current.clientHeight -
              (chatBoxRef.current.scrollHeight - 80) >
              0
          );
        }}
      >
        <div className="w-full flex justify-center items-center">
          {messages.status === "success" && page && (
            <div
              className="bg-maincolorgreen text-white text-sm font-semibold cursor-pointer w-fit px-3 py-2 rounded-2xl"
              onClick={() => {
                loadMessages();
              }}
            >
              {t("showMore")}
            </div>
          )}
          {messages.status === "loading" && page !== 1 && (
            <FaSpinner size={20} className="text-maincolorgreen animate-spin" />
          )}
        </div>
        {messages.status === "loading" && page === 1 ? (
          <div className="w-full h-full flex justify-center items-center">
            <FaSpinner size={50} className="text-maincolorgreen animate-spin" />
          </div>
        ) : (
          messages.data?.map((message, index, messages) => (
            <Message
              message={message.message}
              date={message.date}
              type={message.type}
              key={getHash(message.message + message.date.getTime().toString())}
              sender={
                message.type === "sent"
                  ? loggedUser
                  : {
                      name: receiver?.name,
                      pp: receiver?.photo_url,
                    }
              }
              photo={messages[index - 1]?.type !== message.type}
              insertDate={messages[index + 1]?.type !== message.type}
              status={message?.status || "success"}
            />
          ))
        )}
      </div>
      <div className="p-2 flex flex-col">
        <ChatInput sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default ChatContainer;
