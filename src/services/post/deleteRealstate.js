import { request } from "../axios";
export const deleteRealstate = async (id, data) => {
  return await request({
    url: `/real-estate/destroy-request/${id}`,
    method: "POST",
    data,
  });
};
