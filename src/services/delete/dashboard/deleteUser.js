import { request } from "../../axios";
export const deleteUser = async (id, data) => {
  return await request({
    url: `Dashboard/users/remove-user/${id}`,
    method: "DELETE",
    data,
  });
};
