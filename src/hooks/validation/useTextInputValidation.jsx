import { useState } from "react";
import { useTranslation } from "react-i18next";
const useTextInputValidation = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const validateInput = (inputValue) => {
    const regex = /^[a-zA-Z\s]*$/; // Regex to allow only letters and spaces
    if (!regex.test(inputValue)) {
      setError(
        t(
          "Input must be text only. Numbers and special characters are not allowed."
        )
      );
    } else {
      setError("");
    }
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    if (inputValue === "") {
      setError("");
    } else {
      validateInput(inputValue);
    }
  };

  return {
    value,
    error,
    handleChange,
    setValue,
  };
};

export default useTextInputValidation;
