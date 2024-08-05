import { request } from "../axios";
export const reportRealstate = async (id, data) => {
  return await request({
    url: `/reports/${id}`,
    method: "POST",
    data,
  });
};
