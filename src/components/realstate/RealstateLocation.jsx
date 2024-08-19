import React, { useState } from "react";
import { MdOutlineSatelliteAlt } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import GoogleMap from "google-map-react";
import { useTranslation } from "react-i18next";
import { FaMapMarkerAlt } from "react-icons/fa";
const RealstateLocation = ({ data }) => {
  const [mapKey, setMapKey] = useState(0); // Key to force re-render of GoogleMap component
  const { t } = useTranslation();
  const apiKey = process.env.GOOGLE_MAP_API_KEY;
  const defaultProps = {
    zoom: 15,
    center: {
      lat: Number.parseFloat(data?.lat),
      lng: Number.parseFloat(data?.lng),
    },
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
  const [isSatelliteView, setIsSatelliteView] = useState(false);

  const toggleMapView = () => setIsSatelliteView(!isSatelliteView);
  return (
    <div className="bg-white p-7 rounded-lg shadow-lg border  border-dashed border-maincolorgreen lg:overflow-hidden h-[450px] lg:h-auto">
      <p className="mb-3 text-textColor">{t("realstate location")}</p>
      <div className="flex items-center gap-2">
        <FaMapMarkerAlt size={20} className="text-maincolorgreen" />
        <p className=" font-extrabold text-maincolorgreen text-base md:text-md lg:text-lg xl:text-xl">
          {data?.city?.name} - {data?.region} - {data?.address}
        </p>
      </div>
      <div className="mt-3 h-[80%] w-full rounded-xl  relative ">
        <div className="absolute top-4 left-4 z-10">
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
        </div>

        {/* google map  */}

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
          <Marker
            lat={Number.parseFloat(data?.lat)}
            lng={Number.parseFloat(data?.lng)}
          />
        </GoogleMap>
      </div>
    </div>
  );
};
const Marker = () => {
  return (
    <>
      <div className="pin">
        <p
          className={`absolute right-[-120px] top-[80px] bg-white p-4 hidden text-black rotate-[45deg] w-[200px] min-h-full  
                rounded-xl text-center `}
        >
          house location
        </p>
      </div>
      <div className="pulse"></div>
    </>
  );
};
export default RealstateLocation;
