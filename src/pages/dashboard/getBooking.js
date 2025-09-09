import { request } from "../../services/axios";

export const getBooking = async () => {
  return await request({
    url: `/booking-contracts`,
  });
};
