import { request } from "../axios";
export const passwordRecovery = async (data) => {
  return await request({
    url: "/auth/password/recovery/check",
    data,
    method: "POST",
  });
};
