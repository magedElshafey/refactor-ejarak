import { request } from "../../axios";
export const changeTerms = async (data) => {
  return await request({
    url: "/settings/update",
    method: "POST",
    data,
  });
};
