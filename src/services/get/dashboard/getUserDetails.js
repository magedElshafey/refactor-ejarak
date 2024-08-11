import { request } from "../../axios";
export const getUserDetails = async (id) => {
  return await request({
    url: `/Dashboard/users/${id}`,
  });
};
