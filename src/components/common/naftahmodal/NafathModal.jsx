import React from "react";
import { useTranslation } from "react-i18next";
import logo from "../../../assets/logobglight.png";
const NafathModal = ({
  showModal,
  randomNum,
  nafazStatus,
  loadingNafazStatus,
  loadingNafaz,
  onRetry,
  onCheckStatus,
  role,
}) => {
  const { t } = useTranslation();

  if (
    !showModal ||
    role === "admin" ||
    role === "super_admin" ||
    role === "customer_service"
  )
    return null;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-95 flex items-center justify-center z-50">
      <div className="container mx-auto px-8 md:px-16 flex">
        <div className="w-full md:w-[300px] lg:w-[350px] xl:w-[400px] 2xl:w-[500px] mx-auto bg-white shadow-md border border-maincolorgreen">
          <div className="px-4 pt-3">
            <div className="w-full flex justify-center mb-4">
              <img alt="logo" src={logo} className="h-12" />
            </div>
            <p className="text-slate-400 flex items-center gap-1 mb-2 justify-center">
              {t("order number")} :
              <span className="w-8 h-8 rounded-full flex items-center justify-center bg-maincolorgreen text-white font-medium">
                {randomNum}
              </span>
            </p>
            <p className="text-center text-slate-400 mb-4">
              {t(
                "The order number has been copied. Please confirm with the Nafath application."
              )}
            </p>

            {nafazStatus === "EXPIRED" && (
              <div className="mb-3 text-center">
                <p className="mb-2 text-red-600 text-sm">
                  {t("Your order number has expired. Please check again.")}
                </p>
                <button
                  disabled={loadingNafaz}
                  className="font-semibold underline disabled:cursor-not-allowed"
                  onClick={onRetry}
                >
                  {t("try again")}
                </button>
              </div>
            )}

            {nafazStatus === "WAITING" && (
              <p className="text-maincolorgreen text-sm mb-3 text-center">
                {t("Waiting for confirmation with Nafath app")}
              </p>
            )}
          </div>

          <button
            onClick={onCheckStatus}
            disabled={loadingNafazStatus}
            className="w-full py-2 px-4 flex items-center justify-center bg-maincolorgreen text-white font-semibold disabled:cursor-not-allowed disabled:bg-opacity-30"
          >
            {loadingNafazStatus ? (
              <div className="w-8 h-8 border-8 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              t("continue")
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NafathModal;
