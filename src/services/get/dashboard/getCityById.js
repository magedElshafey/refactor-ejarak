import { request } from "../../axios";
export const getCityById = async (id) => {
  return await request({
    url: `/countries/city/${id}`,
  });
};
