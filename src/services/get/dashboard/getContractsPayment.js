import { request } from "../../axios";
export const getContractsPayments = async () => {
  return await request({
    url: "/Dashboard/transactions/contracts",
  });
};
