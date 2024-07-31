import { request } from "../axios";
export const createElectronicContract = async (data) => {
  return await request({
    url: `/contracts`,
    method: "POST",
    data,
  });
};
