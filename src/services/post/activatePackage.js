import { request } from "../axios";
export const activatePackage = async (id, data) => {
  return await request({
    url: `/payment/package/${id}`,
    method: "POST",
    data,
  });
};
