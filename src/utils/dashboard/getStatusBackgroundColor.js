const getStatusBackgroundColor = (status) => {
    switch (status) {
        case "accepted":
            return "bg-[#2CD889]";
        case "pending":
            return "bg-[#FFC667]";
        case "refused":
            return "bg-[#FED7DC]";
        default:
            return "";
    }
};

export default getStatusBackgroundColor;