import { request } from "../../axios";
export const deletePayment = async (id, data) => {
  return await request({
    url: `/Dashboard/payment-type/${id}`,
    method: "DELETE",
    data,
  });
};
