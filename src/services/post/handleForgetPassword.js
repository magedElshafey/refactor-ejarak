import { request } from "../axios";
export const handleForgetPassword = async (data) => {
  return await request({
    url: "/auth/password/recovery",
    method: "post",
    data,
  });
};
