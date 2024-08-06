import React from "react";
import { useTranslation } from "react-i18next";
import PlacesAutocomplete from "react-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
const EditRealstateMapSearch = ({
  coordinates,
  setCoordinates,
  searchAddress,
  setSearchAddress,
  label,
}) => {
  const { t } = useTranslation();
  const saudiArabiaBounds = new window.google.maps.LatLngBounds(
    new window.google.maps.LatLng(16, 34),
    new window.google.maps.LatLng(32, 55)
  );

  const searchOptions = {
    bounds: saudiArabiaBounds,
    componentRestrictions: { country: "SA" },
  };
  const handleSelect = async (value) => {
    try {
      const results = await geocodeByAddress(value);

      if (results.length > 0) {
        const latLng = await getLatLng(results[0]);

        setCoordinates(latLng);

        setSearchAddress(value);

        // Fetch ads based on the selected address
      } else {
        console.error("No results found for the selected address.");
      }
    } catch (error) {
      console.error("Error while getting coordinates:", error);
    }
  };
  return (
    <div>
      <label className="block mb-1 text-textColor text-md font-medium">
        {t(label)}
      </label>
      <PlacesAutocomplete
        value={searchAddress}
        onSelect={handleSelect}
        searchOptions={searchOptions}
        onChange={setSearchAddress}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <div className="relative">
              <input
                value={searchAddress}
                {...getInputProps({
                  placeholder: t("SearchHere"),
                  className:
                    "rounded-xl w-full outline-none p-3 border border-[#9399A3] bg-white cursor-pointer",
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
              suggestion?.active ? "bg-maincolorgreen text-white" : "bg-white"
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

export default EditRealstateMapSearch;
