import { request } from "../../axios";
export const getCategories = async () => {
  return await request({
    url: "/Dashboard/categories",
  });
};
