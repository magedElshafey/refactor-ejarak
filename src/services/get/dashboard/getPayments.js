import { request } from "../../axios";
export const getPayments = async () => {
  return await request({
    url: "/PaymentType",
  });
};
