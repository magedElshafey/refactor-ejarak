import { request } from "../axios";
export const getMyReservations = async (user) => {
  return await request({
    url:
      user === "owner" || user === "super_admin" || user === "admin"
        ? "/bookings/owner"
        : "/bookings/tenant",
  });
};
