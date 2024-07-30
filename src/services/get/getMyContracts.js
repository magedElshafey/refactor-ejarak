import { request } from "../axios";
export const getMyContracts = async (role) => {
  return await request({
    url: role === "owner" ? "/contracts/owners" : "/contracts/tenant",
  });
};
