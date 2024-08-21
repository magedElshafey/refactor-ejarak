const getNotificationLink = (type, userType, id) => {
  switch (type) {
    case "report_realty":
    case "evaluation_realty":
    case "view_realty":
    case "reject_realty":
      return `/website/realstate/${id}`;
    case "reservation_realty":
      if (userType === "owner")
        return `/website/realstate/reservation-details/${id}`;
    case "acceptance_realty":
    case "fee_payment":
      return `/website/my-reservations`;

    default:
      return "/";
  }
};

export default getNotificationLink;
