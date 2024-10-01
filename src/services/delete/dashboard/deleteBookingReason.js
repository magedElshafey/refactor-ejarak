import { request } from "../../axios";
export const deleteBookingReason = async (id, data) => {
  return await request({
    url: `/Dashboard/rent-refused/${id}`,
    method: "DELETE",
    data,
  });
};
