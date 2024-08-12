import { request } from "../../axios";
export const deleteRealState = async (id, data) => {
    return await request({
        url: `realties/${id}`,
        method: "DELETE",
        data,
    });
};
