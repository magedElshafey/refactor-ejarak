import { request } from "../../axios";
export const addUser = async (data) => {
  return await request({
    url: "/Dashboard/users/add-user",
    method: "POST",
    data,
  });
};
