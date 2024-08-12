import { request } from "../../axios";
export const editUser = async (id, data) => {
  return await request({
    url: `/Dashboard/users/update-user/${id}?_method=patch`,
    method: "POST",
    data,
  });
};
