const getNotificationLink = (type, userType, id) => {
  switch (type) {
    case "report_realty":
    case "evaluation_realty":
    case "view_realty":
      return `/website/realstate/${id}`;
    case "reservation_realty":
      if (userType === "owner")
        return `/website/realstate/reservation-details/${id}`;
    case "acceptance_realty":
    case "fee_payment":
    case "reject_realty":
      return `/website/my-reservations`;
    case "new_realstate":
      if (userType === "admin" || userType === "super_admin") {
        return `/dashboard/realstates`;
      } else {
        return `/website/realstate/${id}`;
      }
    default:
      return "/";
  }
};

export default getNotificationLink;
