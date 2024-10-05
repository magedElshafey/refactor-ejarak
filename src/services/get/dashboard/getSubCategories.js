import { request } from "../../axios";
export const getSubCategories = async (id) => {
  return await request({
    url: `Dashboard/subCategories/category/${id}`,
  });
};
