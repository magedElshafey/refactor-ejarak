// src/hooks/useNumberInput.js

import { useState } from "react";
import { useTranslation } from "react-i18next";
const useNumberInput = (initialValue = "") => {
  const { t } = useTranslation();
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (newValue === "") {
      setError("");
    } else if (!/^[0-9]+$/.test(newValue)) {
      setError(t("Please enter numbers only"));
    } else {
      setError("");
    }
  };

  return { value, error, handleChange, setValue };
};

export default useNumberInput;
