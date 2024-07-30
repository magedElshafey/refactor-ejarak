import { request } from "../axios";
export const getRealStateDetails = async (v) => {
  return await request({
    url: `/realties/${v}`,
  });
};
