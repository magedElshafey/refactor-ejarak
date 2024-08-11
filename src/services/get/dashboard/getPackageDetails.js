import { request } from "../../axios";
export const getPackageDetails = async (id) => {
  return await request({
    url: `/Dashboard/packages/${id}`,
  });
};
