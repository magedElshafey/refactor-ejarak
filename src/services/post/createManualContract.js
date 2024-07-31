import { request } from "../axios";
export const createManualContract = async (data) => {
  return await request({
    url: `/contracts`,
    method: "POST",
    data,
  });
};
