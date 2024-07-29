import { useState } from "react";
import { useTranslation } from "react-i18next";

const usePasswordValidation = (initialValue = "") => {
  const [password, setPassword] = useState(initialValue);
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const validatePassword = (value) => {
    if (value.trim() === "") {
      setIsValid(true);
      setError("");
    } else {
      // Check if password meets length requirement
      if (value.length < 8) {
        setIsValid(false);
        setError(t("invalidPasswordLength"));
        return;
      }
      // Check for uppercase, lowercase, numbers, and special characters
      const upperCaseRegex = /[A-Z]/;
      const lowerCaseRegex = /[a-z]/;
      const numberRegex = /[0-9]/;
      const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
      const isValidPassword =
        upperCaseRegex.test(value) &&
        lowerCaseRegex.test(value) &&
        numberRegex.test(value) &&
        specialCharRegex.test(value);
      if (!isValidPassword) {
        setIsValid(false);
        setError(t("invalidPasswordLength"));
        return;
      }
      setIsValid(true);
      setError("");
    }
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setPassword(value);
    validatePassword(value);
  };

  return {
    password,
    isValid,
    error,
    handleChange,
    setPassword,
  };
};

export default usePasswordValidation;
