import { request } from "../axios";
export const updatePassword = async (data) => {
  return await request({
    url: "/profile/password?_method=PATCH",
    method: "POST",
    data,
  });
};
