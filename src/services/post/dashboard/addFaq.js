import { request } from "../../axios";
export const addFaq = async (data) => {
  return await request({
    url: "/Dashboard/faqs",
    method: "POST",
    data,
  });
};
