import { request } from "../../axios";
export const editFaq = async (id, data) => {
  return await request({
    url: `/Dashboard/faqs/${id}?_method=patch`,
    method: "POST",
    data,
  });
};
