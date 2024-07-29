import { request } from "../axios";
export const getFeatuers = async () => {
  return await request({
    url: "/real-estate/all-features",
  });
};
