import { request } from "../../axios";
export const getPaymentById = async (id) => {
  return await request({
    url: `/Dashboard/payment-type/${id}`,
  });
};
