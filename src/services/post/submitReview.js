import { request } from "../axios";
export const submitReview = async (id, data) => {
  return await request({
    url: `/reviews/${id}`,
    method: "POST",
    data,
  });
};
