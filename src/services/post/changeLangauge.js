import { request } from "../axios";
export const changeLanguage = async (data) => {
  return await request({
    url: "profile/language",
    method: "POST",
    data,
  });
};
