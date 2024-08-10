import { request } from "../../axios";

const updateRealStateStatus = async (status, id, rejectionReason) => {
  return await request({
    url: `/Dashboard/admin/${status === "refused" ? "reject" : "accept"}-real-estate/${id} `,
    method: `${status === "refused" ? "POST" : "GET"}`,
    data: status === "refused" ? { rejectionReason } : null
  })
}

export default updateRealStateStatus;