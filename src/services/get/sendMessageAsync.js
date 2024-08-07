import { request } from "../axios";
import dateTimeFormate from "../../utils/dateTimeFormate";
const sendMessageAsync = async (messageObj) => {
  const currentDate = new Date();
  const newMsg = {
    type: "sent",
    message: messageObj.text,
    date: currentDate,
    uuid: messageObj.uuid,
    status: "success",
  };
  const data = new FormData();
  data.append("receiver_id", messageObj.receiverId);
  data.append("message", messageObj.text);
  data.append("created_at", dateTimeFormate(currentDate));
  const response = await request({ url: "/messages", method: "post", data });
  if (response.status === 200) {
    return newMsg;
  }
  return null;
};

export default sendMessageAsync;
