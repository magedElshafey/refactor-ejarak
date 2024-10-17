import { request } from "../../axios";
export const getReservations = async (category_id, status) => {
  return await request({
    url: `/bookings?category_id=${category_id}&status=${status}`,
  });
};
