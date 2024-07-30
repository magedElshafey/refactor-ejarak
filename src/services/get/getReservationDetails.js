import { request } from "../axios";
export const getReservationDetails = async (id) => {
  return await request({
    url: `/bookings/${id}`,
  });
};
