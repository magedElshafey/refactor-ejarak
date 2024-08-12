import React from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ChatContainer from "../../components/chat/ChatContainer";
import ContactListContainer from "../../components/chat/ContactListContainer";
const Chat = () => {
  const { t } = useTranslation();
  const location = useLocation().pathname.split("/")[1];
  return (
    <div className="px-4 md:px-16 py-4 flex flex-col gap-4 justify-stretch h-[85vh]">
      <p className="text-2xl font-bold">
        {t(location === "chat" ? "chats" : "Live support")}
      </p>
      <div className="relative md:static h-full overflow-hidden grow flex justify-between items-stretch bg-white shadow-lg border gap-6 rounded-lg p-0 md:p-4">
        <ContactListContainer />

        <ChatContainer />
      </div>
    </div>
  );
};

export default Chat;
