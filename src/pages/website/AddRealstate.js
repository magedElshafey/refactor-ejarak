import React, { useState } from "react";
import FormOne from "../../components/addRealState/FormOne";
import FormTwo from "../../components/addRealState/FormTwo";
import { useTranslation } from "react-i18next";
import { useGlobalContext } from "../../hooks/GlobalContext";
import FormThree from "../../components/addRealState/FormThree";
const AddRealstate = () => {
  const [step, setStep] = useState(1);
  const [formState, setFormState] = useState({
    title: "",
    category: "",
    region: "",
    district: "",
    lat: "",
    lng: "",
    address: "",
    notes: "",
    instrument_number: "",
    subCategoryId: "",
    price: "",
    age: "",
    rooms: "",
    bathRooms: "",
    elevators: "",
    area: "",
    turn: "",
    paymentType: "",
    service: "",
    instrument_file: null,
  });
  const { t } = useTranslation();
  const [coordinates, setCoordinates] = useState(null);
  const [searchAddress, setSearchAddress] = useState("");
  const handleSelect = (property) => (selectedOption) => {
    setFormState((prevState) => ({
      ...prevState,
      [property]: selectedOption.id,
    }));
  };
  const handleChange = (property) => (e) => {
    setFormState((prevState) => ({
      ...prevState,
      [property]: e.target.value,
    }));
  };
  const { data } = useGlobalContext();

  const selectedCategory = data.categories.find(
    (item) => item.id === formState.category
  );
  return (
    <div className="container mx-auto px-8 mt-8">
      <h2
        className={`font-extrabold mb-4 text-center md:text-start  text-black text-xl md:text-2xl
       `}
      >
        {t("Advertise your property")}
      </h2>
      <p className="font-bold text-textColor text-lg md:text-xl text-center md:text-start mb-4">
        {step === 3 ? t("attachments") : t("advertiseData")}
      </p>
      {step === 1 && (
        <FormOne
          handleSelect={handleSelect}
          handleChange={handleChange}
          title={formState.title}
          category={formState.category}
          region={formState.region}
          district={formState.district}
          lat={formState.lat}
          lng={formState.lng}
          address={formState.address}
          notes={formState.notes}
          searchValue={formState.searchValue}
          coordinates={coordinates}
          setCoordinates={setCoordinates}
          searchAddress={searchAddress}
          setSearchAddress={setSearchAddress}
          step={step}
          setStep={setStep}
        />
      )}
      {step === 2 ? (
        <FormTwo
          step={step}
          setStep={setStep}
          handleSelect={handleSelect}
          handleChange={handleChange}
          instrument_number={formState.instrument_number}
          selectedCategory={selectedCategory}
          subCategoryId={formState.subCategoryId}
          price={formState.price}
          age={formState.age}
          rooms={formState.rooms}
          bathRooms={formState.bathRooms}
          elevators={formState.elevators}
          area={formState.area}
          turn={formState.turn}
          paymentTypesOpt={data?.paymentTypes}
          paymentType={formState.paymentType}
          service={formState.service}
        />
      ) : null}
      {step === 3 ? <FormThree /> : null}
    </div>
  );
};

export default AddRealstate;
