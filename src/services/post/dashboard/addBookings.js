import { request } from "../../axios";
export const addBookings = async (data) => {
  return await request({
    url: "/Dashboard/rent-refused",
    method: "POST",
    data,
  });
};
