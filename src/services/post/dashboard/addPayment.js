import { request } from "../../axios";
export const addPayment = async (data) => {
  return await request({
    url: "/Dashboard/payment-type",
    method: "POST",
    data,
  });
};