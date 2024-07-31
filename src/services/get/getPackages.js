import { request } from "../axios";
export const getPackages = async () => {
  return await request({
    url: "/packages/my-packages",
  });
};
