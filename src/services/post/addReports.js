import { request } from "../axios";
export const addReports = async (data) => {
  return await request({
    url: "/Dashboard/report-reason",
    method: "POST",
    data,
  });
};
