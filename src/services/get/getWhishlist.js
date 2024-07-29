import { request } from "../axios";
export const getWhishlist = async () => {
  return await request({
    url: "/favorites",
  });
};
