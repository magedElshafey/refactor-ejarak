// useEmailValidation.js

import { useState } from "react";
import { useTranslation } from "react-i18next";
const useEmailValidation = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const validateEmail = (value) => {
    setEmail(value);

    if (value === "") {
      setError("");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setError(t("Invalid email address"));
    } else {
      setError("");
    }
  };

  return {
    email,
    setEmail: validateEmail,
    error,
  };
};

export default useEmailValidation;
