import { request } from "../axios";
export const getPrivacy = async () => {
  return await request({
    url: "/settings",
  });
};
