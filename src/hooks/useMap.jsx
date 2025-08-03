import { useState } from "react";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { useQuery } from "react-query";
import { getNearRealStates } from "../services/get/getNearRealStates";
import { useDispatch, useSelector } from "react-redux";
import { changeLat, changeLng, changeLocation } from "../store/filterSlice";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
const useMap = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const {
    lat,
    lng,
    categoryId,
    subCategoryId,
    highPrice,
    lowPrice,
    roomNumbers,
    bathrooms,
    area,
    name,
    priceCreate,
    sort,
    sortCreate,
    distance,
    airConditions,
    parkingNumbers,
    hasKitchen,
    isEstaplished,
    paymentType,
  } = useSelector((state) => state.filterSlice);
  const [address, setAddress] = useState("");
  const [markers, setMarkers] = useState(null);
  const [coordinates, setCoordinates] = useState({
    lat: "",
    lng: "",
  });

  const [nearestRealStates, setNearestRealStates] = useState([]);
  const {
    isLoading: loadinNearRealStates,
    data,
    isError,
  } = useQuery(
    [
      "near realstates",
      lat,
      lng,
      categoryId,
      subCategoryId,
      highPrice,
      lowPrice,
      roomNumbers,
      bathrooms,
      area,
      name,
      priceCreate,
      sort,
      sortCreate,
      distance,
      airConditions,
      parkingNumbers,
      hasKitchen,
      isEstaplished,
      paymentType,
    ],
    () =>
      getNearRealStates(
        lat,
        lng,
        categoryId,
        subCategoryId,
        highPrice,
        lowPrice,
        roomNumbers,
        bathrooms,
        area,
        name,
        priceCreate,
        sort,
        sortCreate,
        distance,
        airConditions,
        parkingNumbers,
        hasKitchen,
        isEstaplished,
        paymentType
      ),
    {
      onSuccess: (data) => {
        if (data?.data?.status) {
          setNearestRealStates(data?.data?.data);
        } else {
          setNearestRealStates([]);
          Swal.fire({
            icon: "error",
            title: t("error50"),
          });
        }
      },
      onError: () => {
        setNearestRealStates([]);
      },
    }
  );
  const handleSelect = async (value) => {
    try {
      const results = await geocodeByAddress(value);

      if (results.length > 0) {
        const latLng = await getLatLng(results[0]);

        setMarkers(latLng);
        setCoordinates(latLng);

        setAddress(value);
        if (pathname === "/") {
          dispatch(changeLat(latLng.lat));
          dispatch(changeLng(latLng.lng));
          dispatch(changeLocation(value));
        }

        // Fetch ads based on the selected address
      } else {
        console.error("No results found for the selected address.");
      }
    } catch (error) {
      console.error("Error while getting coordinates:", error);
    }
  };
  const handleMapClick = ({ lat, lng }) => {
    const clickedCoordinates = { lat, lng };
    setCoordinates(clickedCoordinates);

    geocodeByAddress(`${lat}, ${lng}`)
      .then((results) => results[0].formatted_address)
      .then((formattedAddress) => {
        setAddress(formattedAddress);
        if (pathname === "/") {
          dispatch(changeLat(lat));
          dispatch(changeLng(lng));
          dispatch(changeLocation(formattedAddress));
        }
      })
      .catch((error) => console.error("Error while reverse geocoding:", error));
    setMarkers(clickedCoordinates);
  };
  console.log("address from click on map", address);
  return {
    handleSelect,
    address,
    setAddress,
    coordinates,
    markers,
    nearestRealStates,
    loadinNearRealStates,
    isError,
    handleMapClick,
  };
};

export default useMap;
