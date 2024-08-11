import { request } from "../../axios";
export const getElectronicContracts = async () => {
  return await request({
    url: "/contracts/eleAgent",
  });
};
