import { request } from "../axios";
export const getNearRealStates = (
  lat,
  lng,
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
  sortCreate,
  distance,
  page,
  perPage
) => {
  return request({
    url: `/real-estate/near-me?lat=${lat}&lng=${lng}&suggestion=true&name=${name}&cat_id=${categoryId}&sub_cat_id=${subCtegoryId}&price_high=${highPrice}&price_low=${lowPrice}&rooms_count=${rooms}&bathrooms_count=${bathrooms}&area=${area}&sort_price=${sortPrice}&sort_by=${sort}&sort_create=${sortCreate}&distance=${distance}&page=${page}&per_page=${perPage}`,
  });
};
