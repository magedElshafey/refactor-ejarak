import { request } from "../axios";
export const handleRegester = async (data) => {
  return await request({ url: "/auth/register", method: "post", data });
};
