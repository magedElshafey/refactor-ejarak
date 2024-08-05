import { request } from "../axios";
export const getRealstateOwner = async (id) => {
  return await request({
    url: `/real-estate/owner/${id}`,
  });
};
