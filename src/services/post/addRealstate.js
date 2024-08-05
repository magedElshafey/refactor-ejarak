import { request } from "../axios";
export const addRealstate = async (data) => {
  return await request({
    url: "/realties",
    method: "POST",
    data,
  });
};
