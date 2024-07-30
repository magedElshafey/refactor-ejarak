import { request } from "../axios";
export const updateRealState = async (id, data) => {
  return await request({
    url: `/realties/${id}?_method=patch`,
    method: "patch",
    data,
  });
};
