import { request } from "../axios";
export const handlePayment = async (id) => {
  return await request({
    url: `/payment/${id}`,
    method: "POST",
    data: "",
  });
};
