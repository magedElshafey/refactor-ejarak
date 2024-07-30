import { request } from "../axios";
export const getMyRealState = async () => {
  return await request({
    url: "/realties",
  });
};
