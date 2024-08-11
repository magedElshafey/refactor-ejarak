import { request } from "../../axios";
export const getManualContracts = async () => {
  return await request({
    url: "/contracts/manual",
  });
};
