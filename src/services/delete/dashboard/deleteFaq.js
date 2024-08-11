import { request } from "../../axios";
export const deleteFaq = async (id, data) => {
  return await request({
    url: `/Dashboard/faqs/${id}`,
    method: "Delete",
    data,
  });
};
