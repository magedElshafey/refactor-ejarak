import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { request } from "../services/axios";

/**
 * Custom hook to manage the Nafath authentication flow.
 * It handles initiating the Nafath request, checking its status,
 * and managing the related UI state (like a modal).
 */
export const useNafath = () => {
  const { userData } = useSelector((state) => state.authSlice);
  const [nafazStatus, setNafazStatus] = useState("");
  const [randomNum, setRandomNum] = useState("");
  const [transId, setTransId] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  console.log("error is", error);
  // Mutation to initiate the Nafath MFA request
  const { isLoading: loadingNafaz, mutate: mutateNafaz } = useMutation(
    (data) =>
      request({
        url: "/nafath/mfa/request",
        method: "POST",
        data,
      }), // <-- Add comma here
    {
      // <-- Add options object wrapper
      onSuccess: (data) => {
        console.log("data from success", data?.data);
        setShowModal(true);
        // <-- Add onSuccess key and function wrapper
        if (data?.data?.random) {
          setTransId(data?.data?.transId);
          const random = data?.data?.random;
          setRandomNum(random);

          if (document.hasFocus()) {
            navigator.clipboard
              .writeText(random)
              .then(() => {
                console.log("Random number copied to clipboard:", random);
              })
              .catch((err) => {
                console.error("Failed to copy:", err);
              });
          } else {
            console.warn("Document not focused. Skipping clipboard copy.");
          }
        } else if (data?.data?.error) {
          setError(true);
          setErrorMessage(data?.data?.message);
        } else {
          setError(true);
          setErrorMessage(data?.data?.message);
        }
      }, // <-- Close onSuccess block
      onError: (err) => {
        Swal.fire({
          icon: "error",
          title: err?.response?.data?.message || "حدث خطأ",
        });
      },
    } // <-- Close options object
  );

  // Mutation to check the status of an ongoing Nafath MFA request
  const { isLoading: loadingNafazStatus, mutate: mutateNafazStatus } =
    useMutation(
      (data) =>
        request({
          url: "/nafath/mfa/request/status",
          method: "POST",
          data,
        }),
      {
        onSuccess: (data) => {
          setNafazStatus(data?.data?.status);
          if (data?.data?.status === "COMPLETED") {
            setShowModal(false);
          }
        },
        onError: (err) => {
          Swal.fire({
            icon: "error",
            title: err?.response?.data?.message || "حدث خطأ",
          });
        },
      }
    );

  // Function to start the Nafath process
  const handleStart = () => {
    // Ensure nationalId exists before mutating
    if (userData?.nationalId) {
      mutateNafaz({ nationalId: userData.nationalId });
    } else {
      console.error("Nafath: National ID is missing from user data.");
      // Optionally show an error to the user
      Swal.fire({
        icon: "error",
        title: "بيانات المستخدم غير مكتملة للتحقق عبر نفاذ",
      });
    }
  };

  // Function to check the status of the current Nafath transaction
  const handleStatusCheck = () => {
    // Ensure required data is available
    if (!userData?.nationalId || !transId || !randomNum) {
      console.error("Nafath: Missing data for status check.");
      return; // Prevent API call with incomplete data
    }
    mutateNafazStatus({
      nationalId: userData?.nationalId,
      transId,
      random: randomNum,
    });
  };

  useEffect(() => {
    // Start Nafath check automatically if user data is loaded,
    // the user is not yet confirmed via Nafath, and a check is not already loading or shown.
    // Ensure userData itself is available before checking its properties.
    if (userData && !userData?.confirmed_with_nafath) {
      handleStart();
    }
  }, []);
  return {
    showModal,
    randomNum,
    nafazStatus,
    loadingNafaz,
    loadingNafazStatus,
    handleStart,
    handleStatusCheck,
    setShowModal,
    error,
    errorMessage,
  };
};
