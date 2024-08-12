import { request } from "../../axios";
export const getSpecialRealState = async (id) => {
    return await request({
        url: `/Dashboard/admin/special-real-estate/${id}`,
    });
};
