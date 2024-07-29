import { request } from "../axios";
export const getMyAccountDetails = async () => {
  return await request({ url: `/profile` });
};
