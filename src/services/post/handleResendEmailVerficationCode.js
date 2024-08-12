import { request } from "../axios";
export const handleResendEmailVerficationCode = async (data) => {
  return await request({
    url: "/auth/identifier/verification",
    method: "POST",
    data,
  });
};
