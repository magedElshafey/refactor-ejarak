import { request } from "../../axios";
export const getReportById = async (id) => {
  return await request({
    url: `/Dashboard/report-reason/${id}`,
  });
};
