import { request } from "../../axios";
export const getPackagesPayment = async () => {
  return await request({
    url: "/Dashboard/subscription",
  });
};
