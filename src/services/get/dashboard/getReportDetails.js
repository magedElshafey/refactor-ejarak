import { request } from "../../axios";
export const getReportDetails = async (id) => {
  return await request({
    url: `/reports/${id}`,
  });
};
