import { request } from "../../axios";
export const editReport = async (id, data) => {
  return await request({
    url: `/Dashboard/report-reason/${id}?_method=patch`,
    method: "patch",
    data,
  });
};
