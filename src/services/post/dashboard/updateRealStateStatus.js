import { request } from "../../axios";

const updateRealStateStatus = async (status, id, rejectionReason) => {
  return await request({
    url: `/${status === "rejected" ? "rejected" : "accept"}-real-estate/${id} `,
    method: `${status === "rejected" ? "POST" : "GET"}`,
    data: status === "rejected" ? { rejectionReason } : null
  })
}

export default updateRealStateStatus