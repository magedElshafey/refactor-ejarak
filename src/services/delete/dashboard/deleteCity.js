import { request } from "../../axios";
export const deleteCity = async (id, data) => {
  return await request({
    url: `/countries/remove-city/${id}`,
    method: "DELETE",
    data,
  });
};
