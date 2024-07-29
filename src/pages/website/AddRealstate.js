import React, { useState } from "react";
import FormOne from "../../components/addRealState/FormOne";
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
  });
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

  return (
    <div className="container mx-auto px-8 mt-8">
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
        />
      )}
    </div>
  );
};

export default AddRealstate;
