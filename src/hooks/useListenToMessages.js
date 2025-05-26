import { useEffect } from "react";
import echo from "../echo.js";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQueryClient } from "react-query";
import notificationSound from "../assets/sounds/notification.wav";

const chatURLs = ["chat", "support-chat"];

const notificationAudio = new Audio(notificationSound);

const useListenToMessages = () => {
  const loggedUser = useSelector((state) => state?.authSlice?.userData);
  const { id: receiverId } = useParams();
  const location = useLocation();
  const queryClient = useQueryClient();

  // Effects ========================

  // Subscribe to the messages channel
  useEffect(() => {
    if (loggedUser) {
      echo.private(`chat.${loggedUser?.id}`).listen(".chat_message", (e) => {
        //play the sound of the notification.
        notificationAudio.play().catch((e) => {
          if (e.name === "NotAllowedError") {
            // handle autoplay errors, for reference https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide
            return;
          }
          throw new Error("unexpected behaviour from the audio player.");
        });
        //add the notification to the list of the notifications.
        addMessage(e);
      });
    }

    return () => {
      echo.private(`chat.${loggedUser?.id}`).stopListening(".chat_message");
    };
  }, [receiverId]);

  // Utility Functions ========================

  //Adding the message to the list of messages;
  const addMessage = async (e) => {
    //Making sure that the user doesn't receive notification from the user he's chatting with.

    // attempting to get the user's id from the URL
    let activeReceiver = null;
    const splittedLocation = location.pathname.split("/");
    if (
      splittedLocation.find((path) =>
        chatURLs.find(
          (chatURL) => chatURL?.toLowerCase() === path?.toLowerCase()
        )
      ) &&
      receiverId
    ) {
      try {
        //make sure that the last element in the url is parsable as intger and thus can be a user id
        activeReceiver = parseInt(receiverId);
      } catch (error) {
        //simply do not do anything if the parsing failed. and there's no ID and thus the active receiver will remain null;
      }
    }
    //if the sender is the current user being chatted with, do not show the notification and simply return;
    if (activeReceiver && activeReceiver === parseInt(e?.sender_id)) return;

    const newMessage = {
      message: e?.message,
      date: new Date(Date.parse(e?.time + "Z")),
    };

    // Add the notification to the list of notifications.
    queryClient.setQueryData(
      ["notifications", "messages"],
      (oldNotifications) => {
        const oldSenderNotifications = oldNotifications[e?.sender_id] || [];
        return {
          ...oldNotifications,
          [e?.sender_id]: [...oldSenderNotifications, newMessage],
        };
      }
    );
  };

  return null;
};

export default useListenToMessages;
