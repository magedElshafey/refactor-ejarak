import { request } from "../../axios";
export const getReports = async () => {
  return await request({
    url: "/reports",
  });
};
