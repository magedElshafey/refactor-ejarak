import { request } from "../../axios";
export const addPackage = async (data) => {
  return await request({
    url: "/Dashboard/packages",
    method: "POST",
    data,
  });
};
