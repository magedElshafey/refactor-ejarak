import { request } from "../axios";
export const bookingRealstate = async (data) => {
  return await request({
    url: "/bookings/store",
    method: "POST",
    data,
  });
};
