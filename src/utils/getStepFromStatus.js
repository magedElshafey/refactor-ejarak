export const getStepFromStatus = (status) => {
  switch (status) {
    case "pending":
      return 1;
    case "completed":
      return 2;
    case "refused":
      return 2;
    case "contract_created":
      return 3;
    case "contract_verified":
      return 4;
    default:
      return 1;
  }
};
