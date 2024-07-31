import React, { useState, useEffect, useRef } from "react";
import GoogleMap from "google-map-react";
import { useSelector } from "react-redux";
import useMap from "../../../hooks/useMap";
import { MdOutlineSatelliteAlt } from "react-icons/md";
import { FaMapMarkedAlt, FaStar, FaFireAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { IoLocationSharp, IoClose } from "react-icons/io5";
import { useLocation } from "react-router-dom";

const MapView = () => {
  // hooks
  const { i18n, t } = useTranslation();
  const { pathname } = useLocation();
  const { lat, lng } = useSelector((state) => state.filterSlice);
  const [isSatelliteView, setIsSatelliteView] = useState(false);
  const { nearestRealStates, loadinNearRealStates, markers } = useMap();

  const [mapKey, setMapKey] = useState(0); // Key to force re-render of GoogleMap component
  const [activeId, setActiveId] = useState(null);
  // default props of map zoom and coordinates(lat , lng)
  const defaultProps = {
    center: { lat, lng },
    zoom: 5,
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

  // api key for map
  const apiKey = process.env.GOOGLE_MAP_API_KEY;
  // handlers
  const toggleMapView = () => setIsSatelliteView(!isSatelliteView);
  // Update map key whenever nearestRealEstates changes
  useEffect(() => {
    // Increment the map key to force re-render of GoogleMap component
    setMapKey((prevKey) => prevKey + 1);
  }, [nearestRealStates]);
  return (
    <div
      className={`relative w-full  ${
        pathname === "/" ? "h-[450px] md:h-[600px]" : "h-[450px]"
      } `}
    >
      <button
        type="button"
        onClick={toggleMapView}
        className={`absolute top-4 ${
          i18n.language === "ar" ? "right-6" : "left-6"
        } z-10 w-10 h-10 text-white bg-maincolorgreen  rounded-full flex justify-center items-center`}
      >
        {isSatelliteView ? (
          <FaMapMarkedAlt size={25} className="text-white" />
        ) : (
          <MdOutlineSatelliteAlt size={25} className="text-white" />
        )}
      </button>

      {loadinNearRealStates ? (
        <div className="bg-maincolorgreen p-3 rounded-md text-white flex items-center justify-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[220px] z-30">
          {t("loading")}
        </div>
      ) : null}
      {!loadinNearRealStates && nearestRealStates && pathname === "/" ? (
        <div className=" absolute left-[50%] top-8 w-[250px] text-white bg-maincolorgreen p-3 flex items-center justify-center rounded-md z-30 translate-x-[-50%]">
          {nearestRealStates?.length} {t("locations beside you")}
        </div>
      ) : null}
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
        {markers && <Marker lat={markers.lat} lng={markers.lng} />}
        {!loadinNearRealStates &&
          pathname === "/" &&
          nearestRealStates &&
          nearestRealStates.map((item, index) => (
            <Marker
              key={index}
              lat={item.lat}
              lng={item.lng}
              data={item}
              activeId={activeId}
              setActiveId={setActiveId}
              pathname={pathname}
            />
          ))}
      </GoogleMap>
    </div>
  );
};
const Marker = ({ data, activeId, setActiveId, pathname }) => {
  const { t } = useTranslation();
  return (
    <>
      {data && pathname === "/" ? (
        <>
          <div
            onClick={() => setActiveId(data.id)}
            className="p-3 rounded-md border border-maincolorgreen bg-white text-maincolorgreen flex items-center justify-center cursor-pointer gap-5 font-bold w-[180px] relative"
          >
            {data?.special === 1 && (
              <FaStar size={18} className="text-yellow-400" />
            )}
            <p>
              {data?.price} {t("currency")}
            </p>
            {data.year_of_construction <= 2 && (
              <FaFireAlt size={22} className="text-red-300" />
            )}
          </div>
          {activeId === data.id && (
            <Popup data={data} activeId={activeId} setActiveId={setActiveId} />
          )}
        </>
      ) : (
        <div>
          <div className="pin">
            <p
              className={`absolute right-[-120px] top-[80px] bg-white p-4 hidden text-black rotate-[45deg] w-[200px] min-h-full rounded-xl text-center `}
            ></p>
          </div>
          <div className="pulse"></div>
        </div>
      )}
    </>
  );
};
const Popup = ({ data, activeId, setActiveId }) => {
  const { t, i18n } = useTranslation();
  const popupRef = useRef();

  return (
    <div
      ref={popupRef}
      className={` duration-300 rounded-lg absolute  bottom-0 ${
        i18n.language === "ar" ? "right-0" : "left-0"
      } z-40 `}
    >
      <div className="relative">
        <img
          src={data?.images[0]}
          alt={data.title}
          className="w-[240px] h-[200px] object-cover rounded-t-lg"
        />
        <div
          onClick={() => setActiveId(null)}
          className={`absolute top-0 ${
            i18n.language === "ar" ? "right-0" : "left-0"
          } w-8 h-8 p-2 flex items-center justify-center rounded-sm bg-red-600 text-white cursor-pointer`}
        >
          <IoClose size={15} />
        </div>
      </div>
      <div className="bg-white p-2 rounded-b-lg w-[240px] h-auto">
        <p className="font-bold text-sm">{data?.name}</p>
        <p className=" text-xs font-semibold py-1 flex items-start gap-x-1  text-[#4D5F65]">
          <IoLocationSharp size={20} />
          {data?.address}
        </p>
        <p className="font-bold text-[#2e3639] px-2">
          {data?.price} {t("currency")}
        </p>
      </div>
    </div>
  );
};
export default MapView;
