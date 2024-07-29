import { request } from "../axios";
export const handleEmailVerfication = async (data) => {
  return await request({
    url: "/auth/identifier/verification/active",
    method: "POST",
    data,
  });
};
