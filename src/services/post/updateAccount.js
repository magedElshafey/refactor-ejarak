import { request } from "../axios";
const headers = {
  "Content-Type": "multipart/form-data",
  Accept: "application/json",
};
export const updateAccount = async (data) => {
  return await request({
    url: "/profile?_method=PATCH",
    method: "POST",
    headers,
    data,
  });
};
