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
    address: "",
    notes: "",
    // instrument_number: "",
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
    furnished: "",
    kitchen: "",
    parkingNumbers: "",
    parkingType: "",
    airConditions: "",
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
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [selectedSuck, setSelectedSuck] = useState(null);
  const [previewSuck, setPreviewSuck] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoPreview, setVideoPrview] = useState(null);
  const [instrument_number, setInstrumentNum] = useState("");
  const [instrumentNumError, setInstrumentNumError] = useState("");
  const handleChangeInstrumentNum = (e) => {
    const value = e.target.value;

    // السماح فقط بالأرقام
    if (!/^\d*$/.test(value)) {
      setInstrumentNumError("يجب أن يحتوي فقط على أرقام");
      return;
    }

    // تحديث القيمة إذا كانت الأرقام فقط
    setInstrumentNum(value);

    // التحقق من الطول
    if (value.length !== 12) {
      setInstrumentNumError("يجب أن يتكون من 12 رقمًا");
    } else {
      setInstrumentNumError(""); // مسح الخطأ إذا كانت الشروط صحيحة
    }
  };

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
          furnished={formState.furnished}
          kitchen={formState.kitchen}
          parkingNumbers={formState.parkingNumbers}
          parkingType={formState.parkingType}
          airConditions={formState.airConditions}
          instrument_number={instrument_number}
          instrumentNumError={instrumentNumError}
          handleChangeInstrumentNum={handleChangeInstrumentNum}
        />
      ) : null}
      {step === 3 ? (
        <FormThree
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
          previewImages={previewImages}
          setPreviewImages={setPreviewImages}
          selectedSuck={selectedSuck}
          setSelectedSuck={setSelectedSuck}
          previewSuck={previewSuck}
          setPreviewSuck={setPreviewSuck}
          selectedVideo={selectedVideo}
          setSelectedVideo={setSelectedVideo}
          videoPreview={videoPreview}
          setVideoPrview={setVideoPrview}
          step={step}
          setStep={setStep}
          title={formState.title}
          category={formState.category}
          region={formState.region}
          district={formState.district}
          address={formState.address}
          notes={formState.notes}
          instrument_number={instrument_number}
          subCategoryId={formState.subCategoryId}
          price={formState.price}
          age={formState.age}
          rooms={formState.rooms}
          bathRooms={formState.bathRooms}
          elevators={formState.elevators}
          area={formState.area}
          turn={formState.turn}
          paymentType={formState.paymentType}
          service={formState.service}
          coordinates={coordinates}
          furnished={formState.furnished}
          kitchen={formState.kitchen}
          parkingNumbers={formState.parkingNumbers}
          parkingType={formState.parkingType}
          airConditions={formState.airConditions}
        />
      ) : null}
    </div>
  );
};

export default AddRealstate;
