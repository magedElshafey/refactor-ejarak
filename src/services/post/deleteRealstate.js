import { request } from "../axios";
export const deleteRealstate = async (id, data) => {
  return await request({
    url: `/realties/${id}`,
    method: "PATCH",
    data,
  });
};
