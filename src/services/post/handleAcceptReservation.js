import { request } from "../axios";
export const handleAcceptReservation = async (id, data) => {
  return await request({
    url: `/bookings/request-respond/${id}`,
    method: "POST",
    data,
  });
};
