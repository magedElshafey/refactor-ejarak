import { useQuery } from "react-query";
import { getPackageDetails } from "../../services/get/dashboard/getPackageDetails";

const usePackageDetails = (packageId) => {
  return useQuery(
    ["package-details-dashboard", packageId],
    () => getPackageDetails(packageId),
    {
      enabled: !!packageId, // Only run the query if packageId is truthy
    }
  );
};

export default usePackageDetails;
