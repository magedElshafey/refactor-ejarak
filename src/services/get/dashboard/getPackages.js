import { request } from "../../axios";
export const getPackages = async () => {
  return await request({
    url: "/Dashboard/packages",
  });
};
