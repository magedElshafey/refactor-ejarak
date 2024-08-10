import { request } from "../../axios";
export const editCity = async (id, data) => {
  return await request({
    url: `/countries/update-city/${id}`,
    method: "POST",
    data,
  });
};
