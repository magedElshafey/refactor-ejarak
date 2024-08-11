import { request } from "../../axios";
export const editPackage = async (id, data) => {
  return await request({
    url: `/Dashboard/packages/${id}?_method=patch`,
    method: "POST",
    data,
  });
};
