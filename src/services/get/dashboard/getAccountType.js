import { request } from "../../axios";
export const getAccountType = async () => {
  return await request({
    url: "/Dashboard/admin/all-features",
  });
};
