import React, { useState, useEffect, useRef } from "react";
import GoogleMap from "google-map-react";
import { useSelector } from "react-redux";
import { MdOutlineSatelliteAlt } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import { geocodeByAddress } from "react-places-autocomplete";

const AddRealstateMap = ({ coordinates, setCoordinates, setSearchAddress }) => {
  const { lat, lng } = useSelector((state) => state.filterSlice);
  const [mapKey, setMapKey] = useState(0); // Key to force re-render of GoogleMap component
  // api key for map
  const apiKey = process.env.GOOGLE_MAP_API_KEY;
  const [isSatelliteView, setIsSatelliteView] = useState(false);
  const toggleMapView = () => setIsSatelliteView(!isSatelliteView);
  const mapRef = useRef(); // Reference to the map instance

  const defaultProps = {
    zoom: 5,
    center: coordinates
      ? {
          lat: coordinates?.lat,
          lng: coordinates?.lng,
        }
      : { lat, lng },
  };
  // Define the map options with the desired map style
  const mapOptions = {
    restriction: {
      latLngBounds: {
        east: 55,
        north: 32,
        south: 16,
        west: 34,
      },
      strictBounds: true,
    },
  };

  useEffect(() => {
    if (coordinates && mapRef.current) {
      // Move the map to the new marker's position without changing the zoom level
      mapRef.current.panTo({
        lat: coordinates.lat,
        lng: coordinates.lng,
      });
    }
  }, [coordinates]);

  const handleMapClick = async ({ lat, lng }) => {
    const clickedCoordinates = { lat, lng };
    setCoordinates(clickedCoordinates);
    try {
      const results = await geocodeByAddress(`${lat},${lng}`);
      if (results && results.length > 0) {
        const address = results[0].formatted_address;
        setSearchAddress(address);
      }
    } catch (error) {
      console.error("Error geocoding coordinates:", error);
    }
  };
  return (
    <div className="h-[450px] relative">
      <button
        type="button"
        onClick={toggleMapView}
        className={`absolute top-4 left-6  z-10 w-10 h-10 text-white bg-maincolorgreen  rounded-full flex justify-center items-center`}
      >
        {isSatelliteView ? (
          <FaMapMarkedAlt size={25} className="text-white" />
        ) : (
          <MdOutlineSatelliteAlt size={25} className="text-white" />
        )}
      </button>
      <GoogleMap
        onClick={handleMapClick}
        key={mapKey}
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        options={{
          ...mapOptions,
          mapTypeId: isSatelliteView ? "satellite" : "roadmap",
        }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          mapRef.current = map;
        }}
      >
        {coordinates ? (
          <Markers lat={coordinates.lat} lng={coordinates.lng} />
        ) : null}
      </GoogleMap>
    </div>
  );
};
const Markers = () => {
  return (
    <>
      <div>
        <div className="pin">
          <p
            className={`absolute right-[-120px] top-[80px] bg-white p-4 hidden text-black rotate-[45deg] w-[200px] min-h-full rounded-xl text-center `}
          ></p>
        </div>
        <div className="pulse"></div>
      </div>
    </>
  );
};
export default AddRealstateMap;
