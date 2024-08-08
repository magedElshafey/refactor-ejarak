import React, { useState } from "react";
import GoogleMap from "google-map-react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { MdOutlineSatelliteAlt } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
const AddRealstateMap = ({ coordinates }) => {
  const { lat, lng } = useSelector((state) => state.filterSlice);
  const { t, i18n } = useTranslation();
  const [mapKey, setMapKey] = useState(0); // Key to force re-render of GoogleMap component
  // api key for map
  const apiKey = process.env.GOOGLE_MAP_API_KEY;
  const [isSatelliteView, setIsSatelliteView] = useState(false);
  const toggleMapView = () => setIsSatelliteView(!isSatelliteView);
  const defaultProps = {
    zoom: 5,
    center: { lat, lng },
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
  return (
    <div className="h-[450px] relative">
      <button
        type="button"
        onClick={toggleMapView}
        className={`absolute top-4 ${
          i18n.language === "ar" ? "left-6" : "right-6"
        } z-10 w-10 h-10 text-white bg-maincolorgreen  rounded-full flex justify-center items-center`}
      >
        {isSatelliteView ? (
          <FaMapMarkedAlt size={25} className="text-white" />
        ) : (
          <MdOutlineSatelliteAlt size={25} className="text-white" />
        )}
      </button>
      <GoogleMap
        key={mapKey}
        bootstrapURLKeys={{
          key: apiKey,
        }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        options={{
          ...mapOptions,
          mapTypeId: isSatelliteView ? "satellite" : "roadmap",
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
