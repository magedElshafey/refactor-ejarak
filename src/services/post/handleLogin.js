import { request } from "../axios";
export const handleLogin = async (data) => {
  return await request({ url: "/auth/login", method: "post", data });
};
