import { request } from "../../axios";
export const addCity = async (data) => {
  return await request({
    url: "/countries/add-city",
    method: "POST",
    data,
  });
};
