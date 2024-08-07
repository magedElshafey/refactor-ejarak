import { request } from "../axios";
const fetchMessages = async (receiverId, page = 1) => {
  try {
    const data = new FormData();
    data.append("receiver_id", receiverId);
    const response = await request({
      url: "/messages/all-messages",
      data,
      method: "post",
      params: {
        page,
      },
    });
    if (response.status === 200) {
      return {
        messages: response.data.data.data.reverse(),
        next: Boolean(response.data.data.next_page_url),
      };
    }
  } catch (e) {
    return null;
  }
};

export default fetchMessages;
