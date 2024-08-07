import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { GoPaperclip } from "react-icons/go";
import { IoPaperPlane } from "react-icons/io5";
import { CiFaceSmile } from "react-icons/ci";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

import echo from "../../echo";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { request } from "../../services/axios";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import ContactsList from "./ContactsList";

export const fetchUserNamePhoto = async (id) => {
  try {
    if (id) {
      const response = await request({ url: `/users/name-photo/${id}` });
      if (response.status === 200) {
        return response.data;
      }
    }
    return null;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const fetchMessages = async (receiverId, url) => {
  if (url) {
    const data = new FormData();
    data.append("receiver_id", receiverId);
    const response = await request({
      url,
      data,
      method: "post",
      headers: {
        accept: "application/json",
      },
    });
    if (response.status === 200) {
      return response?.data?.data;
    }
  }
  return null;
};

const getInitialState = () => ({
  data: [],
  next: "/messages/all-messages",
  previous: null,
  status: "idle",
  currentPage: 0,
});

const SupportChat = () => {
  //global statges
  const loggedUser = useSelector((state) => state?.authSlice?.userData);
  const { id: receiverId } = useParams();
  const { data: receiverData, isLoading: receiverLoading } = useQuery(
    ["userNamePhoto", receiverId],
    () => fetchUserNamePhoto(receiverId)
  );

  //Utilities
  const [t] = useTranslation();

  //local states
  const chatBoxRef = useRef(null);
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState(getInitialState);
  const [typing, setTyping] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    files: [],
    captions: [],
  });
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  // handle click outside the emoji picker
  const emojiPickerRef = useRef(null);

  const handleInputChange = (e) => setUserInput(e.target.value);

  const addOldMessages = (newData, firstFetch) => {
    const dataOrdered = newData.data.reverse();
    if (messages.status !== "loading") {
      return setMessages((existingData) => {
        return {
          data: firstFetch
            ? [...dataOrdered]
            : [...dataOrdered, ...existingData.data],
          next: newData.next,
          previous: newData.previous,
          status: "success",
          currentPage: existingData.currentPage + 1,
        };
      });
    }
  };

  const handleFileChange = (e, isModal) => {
    const filesArray = Array.from(e.target.files);
    const newFiles = filesArray.map((file) => ({
      file: file,
      caption: "",
    }));
    setModalData((prevData) => ({
      files: isModal ? [...prevData.files, ...newFiles] : prevData.files,
      captions: isModal
        ? [...prevData.captions, ...Array(newFiles.length).fill("")]
        : prevData.captions,
    }));
    setIsModalOpen(true);
  };
  const handleCaptionChange = (index, caption, isModal) => {
    setModalData((prevData) => {
      const updatedCaptions = [...prevData.captions];
      updatedCaptions[index] = caption;
      return {
        files: isModal ? prevData.files : [],
        captions: isModal ? updatedCaptions : prevData.captions,
      };
    });
  };

  const handleEmojiSelect = (emoji) => {
    setUserInput((prevUserInput) => prevUserInput + emoji.native);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim() || !receiverId) return;
    const newMsg = {
      type: "user",
      text: userInput,
      date: new Date(),
      ...modalData,
    };
    const formData = new FormData();
    formData.append("receiver_id", receiverId);
    formData.append(
      "message",
      `${userInput} ${selectedEmoji ? selectedEmoji.native : ""}`
    );
    const response = await request({
      url: "/messages",
      method: "post",
      data: formData,
    });
    if (response.status === 201) {
      setMessages((oldMessages) => ({
        ...oldMessages,
        data: [...oldMessages.data, newMsg],
      }));
      clearInputData();
      setShowEmojiPicker(false);
      return;
    }
    Swal.fire({
      icon: "error",
      title: "Something went wrong, try again.",
    });
  };

  const handleSend = async () => {
    setIsModalOpen(false);
    const newMsg = {
      type: "user",
      text: `${userInput} ${selectedEmoji ? selectedEmoji.native : ""}`,
      date: new Date(),
      ...modalData,
    };
    const formData = new FormData();
    formData.append("receiver_id", receiverId);
    formData.append(
      "message",
      `${userInput} ${selectedEmoji ? selectedEmoji.native : ""}`
    );
    const response = await request({
      url: "/messages",
      method: "post",
      data: formData,
    });
    if (response.status === 201) {
      setMessages((oldMessages) => ({
        ...oldMessages,
        data: [...oldMessages.data, newMsg],
      }));
      clearInputData();
      return;
    }
    Swal.fire({
      icon: "error",
      title: "Something went wrong, try again.",
    });
  };

  const clearInputData = () => {
    setUserInput("");
    setModalData({ files: [], captions: [] });
    setTyping(false);
  };

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scroll(0, chatBoxRef.current.scrollHeight);
    }
  };

  const handleReplay = (e) => {
    if (parseInt(e.sender_id) !== parseInt(receiverId)) {
      return;
    }
    const newReplay = {
      type: "replay",
      text: e.message,
      date: new Date(Date.parse(e.time)),
    };
    setMessages((oldMessages) => ({
      ...oldMessages,
      data: [...oldMessages.data, newReplay],
    }));
  };

  const handleClickOutside = (event) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target)
    ) {
      setShowEmojiPicker(false);
    }
  };

  const toggleEmojiPicker = () => setShowEmojiPicker(!showEmojiPicker);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setTyping(userInput.trim() !== "");
  }, [userInput]);

  //connecting to the channel
  useEffect(() => {
    if (loggedUser) {
      echo.private(`chat.${loggedUser?.id}`).listen(".chat_message", (e) => {
        handleReplay(e);
      });
    }

    return () => {
      echo.private(`chat.${loggedUser?.id}`).stopListening(".chat_message");
    };
  }, []);

  // getting the old messages
  const getOlderMessages = async (firstFetch = false) => {
    fetchMessages(
      receiverId,
      firstFetch ? "/messages/all-messages" : messages.next
    ).then((oldMessages) => {
      setMessages((oldMessages) => ({ ...oldMessages, status: "loading" }));
      const data =
        oldMessages?.data?.map((message) => {
          return {
            type: message?.sender_id === loggedUser?.id ? "user" : "replay",
            text: message?.message,
            date: new Date(Date.parse(message?.created_at)),
          };
        }) || [];
      const newData = {
        data,
        next: oldMessages?.next_page_url || null,
        previous: oldMessages?.prev_page_url || null,
      };
      addOldMessages(newData, firstFetch);
    });
  };

  useEffect(() => {
    setMessages(getInitialState);
    if (receiverId) {
      getOlderMessages(true);
      scrollToBottom();
    }
  }, [receiverId]);

  return (
    <div className="mx-auto px-8 md:px-16 mt-12">
      <p className="font-extrabold text-lg md:text-xl lg:text-2xl xl:text-3xl text-textColor mb-3">
        {t("Live chat with")} ${receiverData?.name || ""}
      </p>

      <div className="rounded-[13px] bg-[#FFFFFF] shadow-lg p-3 overflow-hidden border max-h-[510px]">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-[85%] bg-[#F5F7F5] rounded-[13px]">
            <div className="w-full relative">
              <div
                id="mainDiv"
                ref={chatBoxRef}
                className={`h-[400px] overflow-y-scroll p-3`}
              >
                {messages.status === "success" && messages.next && (
                  <div className="w-full flex justify-center">
                    <div
                      className="bg-[#00AA4B] px-6 py-2 w-fit text-white left-[50%] top-0 -translate-x-[50%] cursor-pointer rounded-xl"
                      onClick={() => {
                        getOlderMessages();
                      }}
                    >
                      {t("loadMore")}
                    </div>
                  </div>
                )}
                {messages?.data?.length ? (
                  <div>
                    {messages.data.map((item, index) => {
                      if (item.type === "user")
                        return (
                          <div key={index}>
                            <div className={`my-2 flex  flex-start`}>
                              <div className="flex items-center gap-2">
                                <img
                                  alt="avatar/img"
                                  src={loggedUser.pp}
                                  className="w-12 h-12 rounded-full"
                                />
                                {/*files*/}
                                <div>
                                  {item?.files?.length ? (
                                    <div className="flex items-center gap-5 flex-wrap">
                                      {item.files.map((fileData, index) => (
                                        <div key={index}>
                                          {item.captions[index] && (
                                            <p className="text-[#01937C] text-sm font-bold ">
                                              {item.captions[index]}
                                            </p>
                                          )}

                                          {fileData.file.type.startsWith(
                                            "image/"
                                          ) ? (
                                            <img
                                              src={URL.createObjectURL(
                                                fileData.file
                                              )}
                                              alt={`selected-file-${index}`}
                                              className="w-36 h-36 object-cover rounded-lg"
                                            />
                                          ) : fileData.file.type.startsWith(
                                              "video/"
                                            ) ? (
                                            // Handle video files
                                            <video
                                              src={URL.createObjectURL(
                                                fileData.file
                                              )}
                                              alt={`selected-file-${index}`}
                                              className="w-24 h-24 object-cover rounded-lg"
                                              controls
                                            />
                                          ) : (
                                            // Display other file types, handle as needed
                                            <div>
                                              <a
                                                href={URL.createObjectURL(
                                                  fileData.file
                                                )}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500"
                                              >
                                                {fileData.file.name}
                                              </a>
                                            </div>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  ) : null}
                                  <div>
                                    {item.text && (
                                      <p className="bg-[#01937C] text-white rounded-[10px] p-2 px-3 my-2 ">
                                        {item.text}
                                      </p>
                                    )}
                                    <p className="text-[#7B8793] text-xs flex gap-1">
                                      <p>{item.date.toLocaleTimeString()}</p>
                                      --
                                      <p>{item.date.toLocaleDateString()}</p>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      if (item.type === "replay")
                        return (
                          <div className={`my-2 flex  flex-start`} dir="ltr">
                            <div className="flex items-center gap-2">
                              <img
                                alt="avatar/img"
                                src={receiverData?.photo_url}
                                className="w-12 h-12 rounded-full"
                              />
                              <div>
                                <p className="bg-[#FFFFFF] p-2 px-3 rounded-[10px] flex items-center mb-2 text-[#7B8793]">
                                  {item.text}
                                </p>
                                <p className="text-xs text-[#7B8793] flex gap-1">
                                  <p>{item.date.toLocaleDateString()}</p>
                                  --
                                  <p>{item.date.toLocaleTimeString()}</p>
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                    })}
                  </div>
                ) : null}
              </div>
              <form
                onSubmit={handleSubmit}
                className="rounded-[13px] bg-[#FFFFFF] border border-[#BDC7BC] p-3   w-full h-12 px-3 flex items-center justify-between relative"
              >
                <input
                  onKeyDown={() => setTyping(true)}
                  value={userInput}
                  onChange={handleInputChange}
                  placeholder={t("Write your message")}
                  className="bg-transparent w-[60%] md:w-[90%] outline-none placeholder:text-[#7B8793] placeholder:text-sm"
                  type="text"
                />
                <div className="flex items-center w-[40%] md:w-[10%] gap-3">
                  <CiFaceSmile
                    onClick={toggleEmojiPicker}
                    size={22}
                    className="text-gray-500 cursor-pointer"
                  />
                  <label htmlFor="fileInput" className="cursor-pointer">
                    <GoPaperclip size={22} className="text-gray-500" />
                    <input
                      id="fileInput"
                      type="file"
                      accept="image/*, .pdf, .doc, .docx"
                      style={{ display: "none" }}
                      onChange={(e) => handleFileChange(e, true)}
                      multiple
                    />
                  </label>
                  <IoPaperPlane
                    type="submit"
                    size={22}
                    onClick={handleSend}
                    className="mt-0 text-white bg-[#01937C] w-8 h-6 p-1 rounded-lg"
                  />
                </div>
                <div
                  className={`${
                    showEmojiPicker ? " absolute top-8 left-24 z-50" : "hidden"
                  }`}
                  ref={emojiPickerRef}
                >
                  <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                </div>
              </form>
            </div>
            {isModalOpen && (
              <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-4 rounded-md w-[320px] md:w-[500px] h-[300px] overflow-y-scroll">
                  {modalData.files.map((fileData, index) => (
                    <div key={index} className="mb-4">
                      {fileData.file.type.startsWith("image/") ? (
                        <img
                          src={URL.createObjectURL(fileData.file)}
                          alt={`selected-file-${index}`}
                          className="w-28 object-cover rounded-lg"
                        />
                      ) : (
                        <div>
                          {/* Display other file types, handle as needed */}
                          {fileData.file.name}
                        </div>
                      )}
                      <input
                        type="text"
                        placeholder="Caption"
                        value={modalData.captions[index]}
                        onChange={(e) =>
                          handleCaptionChange(index, e.target.value, true)
                        }
                        className="mt-2 p-1 border border-gray-300 rounded-md w-full outline-none"
                      />
                    </div>
                  ))}

                  <button
                    onClick={handleSend}
                    className="bg-[#01937C] text-white px-4 py-2 rounded-md mt-4"
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="w-[16.5%] max-h-[510px]">
            <ContactsList />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SupportChat;
