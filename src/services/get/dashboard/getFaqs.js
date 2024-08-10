import { request } from "../../axios";
export const getFaq = async () => {
  return await request({
    url: "/faqs",
  });
};
