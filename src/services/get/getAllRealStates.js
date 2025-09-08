// import { request } from "../axios";
// export const getAllRealstates = async (
//   name,
//   rooms,
//   bathrooms,
//   highPrice,
//   lowPrice,
//   area,
//   categoryId,
//   subCtegoryId,
//   sort,
//   sortPrice,
//   sortCreate,
//   city,
//   page,
//   perPage,
//   airConditions,
//   parkingNumbers,
//   hasKitchen,
//   isEstaplished,
//   paymentType
// ) => {
//   return await request({
//     url: `/real-estate?&suggestion=true&name=${name}&rooms_count=${rooms}&bathrooms_count=${bathrooms}&price_high=${highPrice}&price_low=${lowPrice}&area=${area}&cat_id=${categoryId}&sub_cat_id=${subCtegoryId}&sort_by=${sort}&sort_price=${sortPrice}&sort_create=${sortCreate}&city_id=${city}&furniture=${isEstaplished}&kitchen=${hasKitchen}&barking_space=${parkingNumbers}&air_conditioner=${airConditions}&page=${page}&per_page=${perPage}&payment_type_id=${paymentType}`,
//   });
// };
import { request } from "../axios";
export const getAllRealstates = async (params) => {
  // شيل أي قيم undefined أو ""
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== ""
    )
  );

  return await request({
    url: `/real-estate`,
    params: { suggestion: true, ...filteredParams },
  });
};
