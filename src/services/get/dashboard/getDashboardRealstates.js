import { request } from "../../axios";
export const getDashboardRealstates = async () => {
  return await request({
    url: "/Dashboard/admin/all-real-estates",
  });
};
