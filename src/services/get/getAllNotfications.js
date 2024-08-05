import { request } from "../axios";
export const getAllNotfications = async () => {
  return await request({
    url: "/notification/auth-user",
  });
};
