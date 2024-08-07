import { request } from "../../axios";
export const getGeneralData = async () => {
  return await request({
    url: "/general_data",
  });
};
