import { request } from "../../axios";
export const deleteReport = async (id, data) => {
  return await request({
    url: `/Dashboard/report-reason/${id}`,
    method: "DELETE",
    data,
  });
};
