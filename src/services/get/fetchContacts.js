import { request } from "../axios";
const fetchContacts = async (userId) => {
  const response = await request({
    url: `/messages/chatting-user`,
  });
  if (response.status === 200) {
    return response?.data.map((contact) => ({
      time: new Date(Date.parse(contact.created_at + "Z")),
      message: contact.message,
      type: contact.sender_id === userId ? "user" : "replay",
      otherParty: contact.contact,
      id: contact.id,
      unseen: contact.unseen || 0,
    }));
  }
  return [];
};

export default fetchContacts;
