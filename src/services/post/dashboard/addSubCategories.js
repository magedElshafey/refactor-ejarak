import { request } from "../../axios";
export const addSubCategories = async (data) => {
  return await request({
    url: "/Dashboard/subCategories",
    method: "POST",
    data,
  });
};
