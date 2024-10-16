import { request } from "../../axios";
export const getDashboardRealstates = async (status) => {
  return await request({
    url: `/Dashboard/admin/all-real-estates?status=${status}`,
  });
};
