import React, { useState } from "react";
import { useTranslation } from "react-i18next";
const RejectedPopup = ({ isOpen, closePopup, onSubmit }) => {
  const [message, setMessage] = useState("");
  const { t } = useTranslation();
  const handleSubmit = () => {
    onSubmit(message);
    closePopup();
    setMessage("");
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-4 rounded-lg w-1/3">
          <h3 className="text-lg font-semibold mb-2">
            {t("Enter Rejection Reason")}
          </h3>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="flex justify-end mt-2 gap-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
              onClick={handleSubmit}
            >
              {t("send")}
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              onClick={closePopup}
            >
              {t("cancel")}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default RejectedPopup;
