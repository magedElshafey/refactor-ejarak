import { request } from "../../axios";
export const getReportReasons = async () => {
  return await request({
    url: "/Dashboard/report-reason",
  });
};
