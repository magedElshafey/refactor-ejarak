import { request } from "../axios";
export const getPaginatedNotfications = async (page = 1) => {
  return await request({
    url: "/notification/auth-user",
    params: {
      page,
    },
  });
};
