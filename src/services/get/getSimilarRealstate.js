import { request } from "../axios";
export const getSimilarRealstates = async (id) => {
  return await request({
    url: `/real-estate/similar/${id}`,
  });
};
