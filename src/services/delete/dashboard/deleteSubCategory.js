import { request } from "../../axios";
export const deleteSubCategory = async (id, data) => {
  return await request({
    url: `/Dashboard/subCategories/${id}`,
    method: "DELETE",
    data,
  });
};
