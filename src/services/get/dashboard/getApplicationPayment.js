import { request } from "../../axios";
export const getApplicationPayment = async () => {
  return await request({
    url: "/Dashboard/transactions/appFees",
  });
};
