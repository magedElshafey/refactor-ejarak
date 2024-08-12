import { request } from "../../axios";
export const getReservations = async () => {
  return await request({
    url: "/bookings",
  });
};
