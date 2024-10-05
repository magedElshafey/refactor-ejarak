import { request } from "../../axios";
export const editPayment = async (id, data) => {
  return await request({
    url: `/Dashboard/payment-type/${id}?_method=patch`,
    method: "POST",
    data,
  });
};
