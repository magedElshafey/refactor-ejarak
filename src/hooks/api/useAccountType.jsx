import { getAccountType } from "../../services/get/dashboard/getAccountType";
import { useQuery } from "react-query";

const useAccountType = () => {
  const {
    isLoading: loadingAccountType,
    data: accountType,
    error,
  } = useQuery("account-type", getAccountType);

  return { loadingAccountType, accountType, error };
};

export default useAccountType;
