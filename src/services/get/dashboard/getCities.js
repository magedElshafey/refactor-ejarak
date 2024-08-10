import { request } from "../../axios";
export const getCities = async () => {
  return await request({
    url: "/countries/1/cities",
  });
};
