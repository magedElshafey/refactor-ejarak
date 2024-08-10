import { request } from "../../axios";
export const getFaqDetails = async (id) => {
  return await request({
    url: `/faqs/${id}`,
  });
};
