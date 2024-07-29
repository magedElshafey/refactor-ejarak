import React, { useState } from "react";
import FormOne from "../../components/addRealState/FormOne";
const AddRealstate = () => {
  const [step, setStep] = useState(1);
  return (
    <div className="container mx-auto px-8 mt-8">
      {step === 1 && <FormOne />}
    </div>
  );
};

export default AddRealstate;
