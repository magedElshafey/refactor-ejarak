import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import useMap from "../../../hooks/useMap";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
const SearchOnMap = () => {
  const { handleSelect, address, setAddress } = useMap();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const homeStyle =
    "w-full mb-2 bg-white px-3 text-black rounded-xl md:rounded-lg font-medium focus:outline-none focus:border-[#275efe] placeholder:text-m2 placeholder:md:text-base placeholder:text-xs min-h-[42px] z-[2000] border border-[#707070]";

  const formStyle =
    "rounded-xl w-full outline-none px-3 h-[40px] bg-[#BDC7BC4D] cursor-pointer";
  // force auto complete packages to search on saudi arabia only
  const saudiArabiaBounds = new window.google.maps.LatLngBounds(
    new window.google.maps.LatLng(16, 34),
    new window.google.maps.LatLng(32, 55)
  );

  const searchOptions = {
    bounds: saudiArabiaBounds,
    componentRestrictions: { country: "SA" },
  };
  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onSelect={handleSelect}
        searchOptions={searchOptions}
        onChange={setAddress}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <div className="relative">
              <input
                value={address}
                {...getInputProps({
                  placeholder: t("SearchHere"),
                  className: `${pathname === "/" ? homeStyle : formStyle}`,
                })}
              />

              <div className="autocomplete-dropdown-container z-[1001] absolute top-15 left-0 w-full rounded-lg overflow-hidden">
                {suggestions &&
                  suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      {...getSuggestionItemProps(suggestion)}
                      className={`
                    z-[1001] cursor-pointer
                      py-1 px-2
                      ${
                        suggestion?.active
                          ? "bg-maincolorgreen text-white"
                          : "bg-white"
                      }`}
                    >
                      {loading ? (
                        <div>Loading...</div>
                      ) : (
                        suggestion?.description
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default SearchOnMap;
