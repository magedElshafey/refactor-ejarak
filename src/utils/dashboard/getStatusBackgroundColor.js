const getStatusBackgroundColor = (status) => {
  switch (status) {
    case "accepted":
      return "bg-[#2CD889]";
    case "pending":
      return "bg-[#FFC667]";
    case "refused":
      return "bg-[#FED7DC]";
    case "contract_created":
      return "bg-[#79BAEC]";
    case "deleted":
      return "bg-[#DC3545]";
    default:
      return "";
  }
};

export default getStatusBackgroundColor;
