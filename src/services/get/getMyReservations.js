import { request } from "../axios";
export const getMyReservations = async (user) => {
  return await request({
    url: user === "owner" ? "/bookings/owner" : "/bookings/tenant",
  });
};
