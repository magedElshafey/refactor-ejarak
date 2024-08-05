import { request } from "../axios";
export const handleLogout = async () => {
  return await request({
    url: "/auth/logout",
  });
};
