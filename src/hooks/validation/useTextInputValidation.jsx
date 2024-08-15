import { useState } from "react";
import { useTranslation } from "react-i18next";

const useTextInputValidation = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const validateInput = (inputValue) => {
    const regex = /^[a-zA-Z\u0600-\u06FF\s]*$/; // Regex to allow Arabic, English letters, and spaces
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
