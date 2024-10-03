import { request } from "../../axios";
export const deleteCateogry = async (id, data) => {
  return await request({
    url: `/Dashboard/categories/${id}`,
    method: "DELETE",
    data,
  });
};
