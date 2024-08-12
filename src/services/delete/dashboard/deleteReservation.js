import { request } from "../../axios";
export const deleteReservation = async (id, data) => {
  return await request({
    url: `/bookings/${id}`,
    method: "DELETE",
    data,
  });
};
