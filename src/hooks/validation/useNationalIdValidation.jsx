import { useState } from "react";
import { useTranslation } from "react-i18next";
const useNationalIdValidation = () => {
  const { t } = useTranslation();
  const [nationId, setNationId] = useState("");
  const [nationError, setNationError] = useState("");
  const [isValidId, setIsValidId] = useState(false);

  const handleNationIdChange = (event) => {
    const { value } = event.target;
    const isValid = /^[1-2]\d{9}$/.test(value);
    setNationId(value);
    if (isValid) {
      setNationError("");
      setIsValidId(true);
    } else if (value === "") {
      setNationError("");
      setIsValidId(false);
    } else {
      setNationError(t("nationErr"));
      setIsValidId(false);
    }
  };

  return {
    nationId,
    nationError,
    isValidId,
    handleNationIdChange,
    setNationId,
  };
};

export default useNationalIdValidation;
