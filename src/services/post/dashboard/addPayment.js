import { request } from "../../axios";
export const addPayment = async (data) => {
  return await request({
    url: "/PaymentType/add-PaymentType",
    method: "POST",
    data,
  });
};
