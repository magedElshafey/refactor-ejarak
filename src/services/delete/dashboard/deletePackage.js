import { request } from "../../axios";
export const deletePackage = async (id, data) => {
  return await request({
    url: `/Dashboard/packages/${id}`,
    method: "DELETE",
    data,
  });
};
