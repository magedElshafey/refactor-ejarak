import { useQuery } from "react-query";
import { getPrivacy } from "../../services/get/getPrivacy";
const useFilteredContent = (key) => {
  return useQuery(["settings", key], getPrivacy, {
    select: (data) => data?.data?.data?.find((item) => item.key === key),
  });
};

export default useFilteredContent;
