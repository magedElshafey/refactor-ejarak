import { request } from "../../axios";
export const getUsers = async () => {
  return await request({
    url: "/users",
  });
};
