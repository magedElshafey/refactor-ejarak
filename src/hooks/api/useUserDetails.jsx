import { useQuery } from "react-query";
import { getUserDetails } from "../../services/get/dashboard/getUserDetails";
const useUserDetails = (userId) => {
  const { isLoading, data, error } = useQuery(
    ["user-details", userId],
    () => getUserDetails(userId),
    {
      enabled: !!userId, // Ensures the query runs only if userId is truthy
    }
  );

  return { isLoading, data, error };
};

export default useUserDetails;
