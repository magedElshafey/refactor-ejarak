import { request } from "../../axios";
export const addCategories = async (data) => {
  return await request({
    url: "/Dashboard/categories",
    method: "POST",
    data,
  });
};
