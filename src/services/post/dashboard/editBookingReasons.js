import { request } from "../../axios";
export const editBookingReason = async (id, data) => {
  return await request({
    url: `/Dashboard/rent-refused/${id}?_method=patch`,
    method: "patch",
    data,
  });
};
