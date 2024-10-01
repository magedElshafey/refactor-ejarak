import { request } from "../../axios";
export const getBookingById = async (id) => {
  return await request({
    url: `/Dashboard/rent-refused/${id}`,
  });
};
