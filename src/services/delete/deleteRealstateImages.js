import { request } from "../axios";
export const deleteRealstateImages = async (id, data) => {
  return await request({
    url: `/real-estate/destroy-image/${id}`,
    method: "DELETE",
    data,
  });
};
