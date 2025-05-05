// hooks/useNafath.js
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { request } from "../services/axios";
export const useNafath = () => {
  const { userData } = useSelector((state) => state.authSlice);
  const role = userData?.account?.type;
  const [nafazStatus, setNafazStatus] = useState("");
  const [randomNum, setRandomNum] = useState("");
  const [transId, setTransId] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleNafazCheck = async (data) => {
    return await request({
      url: "/nafath/mfa/request",
      method: "POST",
      data,
    });
  };

  const handleNafazStatusCheck = async (data) => {
    return await request({
      url: "/nafath/mfa/request/status",
      method: "POST",
      data,
    });
  };

  const { isLoading: loadingNafaz, mutate: mutateNafaz } = useMutation(
    handleNafazCheck,
    {
      onSuccess: (data) => {
        if (data?.status === 200) {
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
          setTransId(data?.data?.transId);
          setShowModal(true);
        } else {
          Swal.fire({
            icon: "error",
            title: "حدث خطأ، يرجى المحاولة لاحقاً",
          });
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

  const { isLoading: loadingNafazStatus, mutate: mutateNafazStatus } =
    useMutation(handleNafazStatusCheck, {
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
    });

  const handleStart = () => {
    if (userData?.nationalId) {
      mutateNafaz({ nationalId: userData.nationalId });
    }
  };

  const handleStatusCheck = () => {
    mutateNafazStatus({
      nationalId: userData?.nationalId,
      transId,
      random: randomNum,
    });
  };

  useEffect(() => {
    handleStart();
  }, [userData?.nationalId]);

  return {
    showModal,
    randomNum,
    nafazStatus,
    loadingNafaz,
    loadingNafazStatus,
    handleStart,
    handleStatusCheck,
    setShowModal,
    setRandomNum,
    setNafazStatus,
    role,
  };
};
