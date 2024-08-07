import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import fetchContacts from "../../services/get/fetchContacts";
import echo from "../../echo";
import { v4 as uuidv4 } from "uuid";
import fetchPublicUserInfo from "../../services/get/fetchPublicUserInfo";
import { useTranslation } from "react-i18next";
const Contact = ({ message, time, type, otherParty, unseen, id, onChoose }) => {
  console.log("this is the time", time);
  const { id: receiverId } = useParams();
  const queryClient = useQueryClient();
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { pathname } = useLocation();

  // used to load the user's public information if there are no public infromation.
  const [localOtherParty, setLocalOtherParty] = useState({
    ...otherParty,
    status:
      otherParty?.name === null || otherParty.photo === null
        ? "loading"
        : "idle",
  });

  useEffect(() => {
    if (localOtherParty.status === "loading") {
      fetchPublicUserInfo(otherParty.id).then((response) => {
        setLocalOtherParty((old) => ({
          ...old,
          name: response?.name || "",
          photo: {
            avatar: {
              original: response?.photo_url || "",
              thumb: response?.photo_url || "",
            },
          },
          status: "success",
        }));
      });
    }
  }, [otherParty]);
  const { i18n } = useTranslation();
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
    <Link
      to={
        receiverId
          ? [
              ...pathname.split("/").slice(0, pathname.split("/").length - 1),
              otherParty?.id,
            ].join("/")
          : `${otherParty?.id}`
      }
      onClick={() => {
        // remove the unseen locally.
        queryClient.setQueryData(["contacts"], (data) => {
          if (unseen === 0) return data;
          return data.map((contact) => {
            if (contact.id !== id) return contact;
            return {
              ...contact,
              unseen: 0,
            };
          });
        });

        //removing the notification the the messages menu
        queryClient.setQueryData(["notifications", "messages"], (data) => {
          const copy = { ...data };
          delete copy[otherParty?.id];
          return copy;
        });

        //Execute any handler passed by the parent
        onChoose && onChoose();
      }}
    >
      <div
        className={`w-full py-1 rounded-lg flex gap-1 px-2 cursor-pointer ${
          parseInt(receiverId) === otherParty.id
            ? "bg-white border w-[98%]"
            : "hover:bg-gray-50"
        }`}
      >
        {localOtherParty.status === "loading" ? (
          <div className="h-10 w-10 bg-slate-300 rounded-full overflow-hidden animate-pulse" />
        ) : (
          <img
            src={localOtherParty?.photo?.avatar?.original}
            alt="receiver"
            className="w-10 h-10 min-w-10 min-h-10 rounded-full overflow-hidde"
          />
        )}
        <div className="flex flex-col gap-1 min-w-[38%] w-full flex-1">
          <p className="text-xs">
            {localOtherParty.status === "loading"
              ? t("loading")
              : localOtherParty?.name}
          </p>
          <p className="text-[0.65rem] overflow-hidden whitespace-nowrap text-ellipsis">
            {message}
          </p>
        </div>
        <div className={`flex justify-center items-center min-w-[14%] w-[14%]`}>
          {unseen > 0 && (
            <div className="rounded-full text-xs lg: px-1 flex justify-center items-center bg-maincolorgreen text-white z-10 -translate-y-1 min-h-5 min-w-5 h-5 w-5">
              <div>{unseen}</div>
            </div>
          )}
        </div>
        <div className="text-[0.65rem] flex-col [&>*]:flex-1 gap-1">
          <div className="flex flex-col items-center justify-center">
            <p>{formatDateTime(time)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

const ContactsList = ({ search, onChoose }) => {
  const loggedUser = useSelector((state) => state?.authSlice?.userData);
  const { id: receiverId } = useParams();
  const queryClient = useQueryClient();
  const { data: contacts, isLoading } = useQuery(
    ["contacts"],
    () => fetchContacts(loggedUser?.id),
    {
      staleTime: "Infinity",
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: false,
    }
  );

  useEffect(() => {
    if (loggedUser) {
      echo.private(`chat.${loggedUser?.id}`).listen(".chat_message", (e) => {
        addNotification(e);
      });
    }

    return () => {
      echo.private(`chat.${loggedUser?.id}`).stopListening(".chat_message");
    };
  }, [receiverId]);

  // clear the norifications from the current chat, if there is a current chat.
  useEffect(() => {
    if (receiverId) {
      queryClient.setQueryData("contacts", (data) => {
        const newData = data?.map((contact) => {
          if (contact.otherParty.id !== parseInt(receiverId)) return contact;
          return {
            ...contact,
            unseen: 0,
          };
        });
        return newData;
      });
    }
  }, [receiverId, contacts]);

  const addNotification = (e) => {
    if (receiverId !== e.sender_id) {
      queryClient.setQueryData(["contacts"], (data) => {
        // if the data hasn't loaded yet and a notification is received, return
        if (!data) {
          return;
        }
        // if the sender's data already exists in the contacts, simply increment the number of unseen
        if (
          data.find((record) => record.otherParty.id === parseInt(e?.sender_id))
        ) {
          return data.map((contact) => {
            if (contact?.otherParty?.id !== e.sender_id) return contact;
            return {
              ...contact,
              unseen: contact.unseen + 1,
              message: e.message,
              time: new Date(Date.parse(e.time)),
            };
          });
        }
        // if the user doesn't exist in the contact list, inform the component that it needs to fetch it
        const newContact = {
          id: uuidv4(),
          message: e?.message,
          otherParty: {
            id: e?.sender_id,
            name: null,
            photo: null,
          },
          time: new Date(Date.parse(e?.time)),
          type: "replay",
          unseen: 1,
        };
        return [newContact, ...data];
      });
    }
  };
  <div className="h-full w-full overflow-y-auto flex flex-col gap-2 overflow-x-hidden">
    {!isLoading &&
      contacts
        ?.filter(
          (contact) =>
            contact?.otherParty?.id &&
            (search
              ? contact?.otherParty?.name
                  ?.toLowerCase()
                  ?.includes(search?.toLowerCase())
              : true)
        )
        ?.map((contact) => (
          <Contact
            key={contact?.id}
            time={contact?.time}
            message={contact?.message}
            type={contact?.type}
            otherParty={contact?.otherParty}
            unseen={contact?.unseen}
            id={contact?.id}
            onChoose={onChoose}
          />
        ))}
  </div>;
};

export default ContactsList;
