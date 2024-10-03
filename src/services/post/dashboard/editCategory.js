import { request } from "../../axios";
export const editCategory = async (id, data) => {
  return await request({
    url: `/Dashboard/categories/update/${id}?_method=patch`,
    method: "POST",
    data,
  });
};
