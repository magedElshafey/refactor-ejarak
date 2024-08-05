import React, { useState } from "react";
import { MdOutlineSatelliteAlt } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import GoogleMap from "google-map-react";
import { useTranslation } from "react-i18next";
import { FaMapMarkerAlt } from "react-icons/fa";

const RealstateLocation = ({ data }) => {
  const { t } = useTranslation();
  const houseCoordinates = {
    lat: data.lat,
    lng: data.lng,
  };
  const [isSatelliteView, setIsSatelliteView] = useState(false);
  const handleToggleMapView = () => {
    setIsSatelliteView((prevIsSatelliteView) => !prevIsSatelliteView);
  };
  const apiKey = process.env.GOOGLE_MAP_API_KEY;
  console.log("api key", apiKey);

  const defaultProps = {
    center: houseCoordinates,
    zoom: 10,
  };
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
    <div className="bg-white p-7 rounded-lg shadow-lg border  border-dashed border-maincolorgreen">
      <p className="mb-3 text-textColor">{t("realstate location")}</p>
      <div className="flex items-center gap-2">
        <FaMapMarkerAlt size={20} className="text-maincolorgreen" />
        <p className=" font-extrabold text-maincolorgreen text-base md:text-md lg:text-lg xl:text-xl">
          {data?.city?.name} - {data?.region} - {data?.address}
        </p>
      </div>
      <div className="mt-3 h-[250px] w-full rounded-xl  relative">
        <div className="absolute top-4 left-4 z-10">
          <button
            type="button"
            onClick={handleToggleMapView}
            className="w-12 h-12 text-white bg-maincolorgreen px-3 py-1 rounded-full flex justify-center items-center"
          >
            {isSatelliteView ? (
              <FaMapMarkedAlt size={22} className="text-white" />
            ) : (
              <MdOutlineSatelliteAlt size={22} className="text-white" />
            )}
          </button>
        </div>

        {/* google map  */}

        <GoogleMap
          key={houseCoordinates.lat + houseCoordinates.lng}
          bootstrapURLKeys={{
            key: apiKey,
          }}
          defaultCenter={houseCoordinates}
          defaultZoom={defaultProps.zoom}
          options={{
            ...mapOptions,
            mapTypeId: isSatelliteView ? "satellite" : "roadmap",
          }}
        >
          <Marker lat={houseCoordinates.lat} lng={houseCoordinates.lng} />
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
