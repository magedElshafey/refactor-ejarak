import { request } from "../axios";
export const getRealstateReviews = async (id) => {
  return await request({
    url: `reviews/real-estate/${id}`,
  });
};
