import { request } from "../axios";
export const getRealstateBookings = async (id) => {
  return await request({
    url: `/bookings/real-bookings/${id}`,
  });
};
