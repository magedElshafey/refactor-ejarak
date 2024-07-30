import { request } from "../axios";
export const deleteRealstate = async (id) => {
  return await request({
    url: `/realties/${id}`,
    method: "delete",
  });
};
