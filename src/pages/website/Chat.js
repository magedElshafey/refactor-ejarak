import React from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ChatContainer from "../../components/chat/ChatContainer";
const Chat = () => {
  const { t } = useTranslation();
  const location = useLocation().pathname.split("/")[1];
  return (
    <div className="px-4 md:px-16 py-4 flex flex-col gap-4 justify-stretch h-[85vh]">
      <p className="text-2xl font-bold">
        {t(location === "chat" ? "chats" : "Live support")}
      </p>
      <ChatContainer />
    </div>
  );
};

export default Chat;
