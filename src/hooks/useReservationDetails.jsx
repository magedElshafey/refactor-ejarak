import { getReservationDetails } from "../services/get/getReservationDetails";
import { useQuery } from "react-query";
const useReservationDetails = (id) => {
  return useQuery(["reservation-details", id], () => getReservationDetails(id));
};

export default useReservationDetails;
