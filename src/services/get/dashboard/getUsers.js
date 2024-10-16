import { request } from "../../axios";
export const getUsers = async (accountType) => {
  return await request({
    url: `/Dashboard/users?account_type=${accountType}`,
  });
};
