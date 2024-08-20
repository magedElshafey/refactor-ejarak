import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { LuSendHorizonal } from "react-icons/lu";
import { TiAttachment } from "react-icons/ti";
import { CiFaceSmile } from "react-icons/ci";
import Picker from "@emoji-mart/react";
import emojiData from "@emoji-mart/data";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
const ChatInput = ({ sendMessage }) => {
  // < -------- global states ------- >
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { id: receiverId } = useParams();

  // < -------- local states ------- >
  const [text, setText] = useState("");
  const [emojiPickerVisivle, setEmojiPickerVisible] = useState(false);
  const emojiPickerRef = useRef(null);
  const inputRef = useRef(null);
  // < -------- Effects ------- >
  useEffect(() => {
    const handleCloseEmojiPicker = (e) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(e.target)
      ) {
        setEmojiPickerVisible(false);
      }
    };

    window.addEventListener("click", handleCloseEmojiPicker);

    return () => {
      window.removeEventListener("click", handleCloseEmojiPicker);
    };
  }, []);

  const emptyInput = () => setText("");

  const onSendMessage = () => {
    if (!receiverId) {
      return Swal.fire({
        icon: "error",
        title: t("please select a contact before sending"),
      });
    }
    if (!text) {
      return Swal.fire({
        icon: "error",
        title: t("please select a contact before sending"),
      });
    }
    const uuid = uuidv4();
    const messageObj = {
      text,
      uuid,
      receiverId,
    };
    sendMessage(messageObj);
    return emptyInput();
  };
  return (
    <div
      className="mt-auto w-full h-10 bg-white border rounded-lg flex justify-between gap-1 items-center py-1 px-2"
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          onSendMessage();
        }
      }}
    >
      <input
        type="text"
        ref={inputRef}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setEmojiPickerVisible(false);
        }}
        className="outline-none text-sm flex-1"
        placeholder={t("Write your message")}
        autoFocus
      />
      <div ref={emojiPickerRef}>
        <CiFaceSmile
          size={20}
          className="cursor-pointer text-[#b8c3cc]"
          onClick={() => {
            inputRef.current.focus();
            setEmojiPickerVisible(!emojiPickerVisivle);
          }}
        />
        {emojiPickerVisivle && (
          <div className="relative">
            <div className="absolute -top-[440px] -right-[350px]">
              <Picker
                data={emojiData}
                onEmojiSelect={(emoji) => {
                  inputRef.current.focus();
                  setText((old) => old + emoji.native);
                }}
              />
            </div>
          </div>
        )}
      </div>
      {/* <TiAttachment
        size={22}
        className="cursor-pointer text-[#b8c3cc] hover:text-gray-500"
      /> */}
      <LuSendHorizonal
        size={32}
        className={`bg-maincolorgreen p-1 rounded-full text-white cursor-pointer ${
          language === "ar" ? "rotate-180 z-0" : ""
        }`}
        onClick={onSendMessage}
      />
    </div>
  );
};

export default ChatInput;
