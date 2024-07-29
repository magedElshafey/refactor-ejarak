import { request } from "../axios";
export const getAllRealstates = async (
  categoryId,
  subCtegoryId,
  highPrice,
  lowPrice,
  rooms,
  bathrooms,
  area,
  name,
  sortPrice,
  sort,
  sortCreate
) => {
  return await request({
    url: `/real-estate?lat=""&lng=""&suggestion=true&name=${name}&rooms_count=${rooms}&bathrooms_count=${bathrooms}&price_high=${highPrice}&price_low=${lowPrice}&area=${area}&cat_id=${categoryId}&sub_cat_id=${subCtegoryId}&sort_by=${sort}&sort_price=${sortPrice}&sort_create=${sortCreate}`,
  });
};
