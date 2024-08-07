import React from "react";
import ContactListContainer from "./ContactListContainer";
import ChatContainer from "./ChatContainer";

const Chat = () => {
  return (
    <div className="relative md:static h-full overflow-hidden grow flex justify-between items-stretch bg-white shadow-lg border gap-6 rounded-lg p-0 md:p-4">
      <ContactListContainer />

      <ChatContainer />
    </div>
  );
};

export default Chat;
