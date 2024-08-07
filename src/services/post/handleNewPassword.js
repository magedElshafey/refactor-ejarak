import { request } from "../axios";
export const handleNewPassword = async (data) => {
  return await request({
    url: "/auth/password/recovery/reset",
    method: "POST",
    data,
  });
};
