import { request } from "../../axios";
export const getBookingRefusedReasons = async () => {
  return await request({
    url: "/Dashboard/rent-refused",
  });
};
