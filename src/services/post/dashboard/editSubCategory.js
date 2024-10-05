import { request } from "../../axios";
export const editSubCategory = async (id, data) => {
  return await request({
    url: `/Dashboard/subCategories/update/${id}?_method=patch`,
    method: "POST",
    data,
  });
};
