import { request } from "../../axios";
export const getReservations = async (
  category_id,
  status,
  from_date,
  to_date
) => {
  return await request({
    url: `/bookings?category_id=${category_id}&status=${status}&from_date=${from_date}&to_date=${to_date}`,
  });
};
