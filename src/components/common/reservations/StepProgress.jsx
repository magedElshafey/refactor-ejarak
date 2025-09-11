import { useTranslation } from "react-i18next";
import { getStepFromStatus } from "../../../utils/getStepFromStatus";

const positiveSteps = [
  "الحجز قيد المراجعة",
  "الحجز مقبول",
  "تم انشاء العقد",
  "تم توثيق العقد",
];

const negativeSteps = ["الحجز قيد المراجعة", "الحجز مرفوض"];

const StepProgress = ({ status }) => {
  const { i18n } = useTranslation();

  const steps = status === "refused" ? negativeSteps : positiveSteps;

  // نجيب رقم الخطوة الحالية
  const currentStep = getStepFromStatus(status);
  return (
    <div className="relative w-full flex flex-col items-center">
      {/* الخط الأساسي الرمادي */}
      <div className="absolute top-4 left-0 w-full h-1 bg-gray-300 z-0"></div>

      {/* الخط الأخضر حسب الحالة */}
      <div
        className={`absolute top-4 ${
          i18n.language === "ar" ? "right-0" : "left-0"
        } h-1 bg-green-600 z-0 transition-all duration-300`}
        style={{
          width: `${(currentStep / (steps.length - 1)) * 100}%`,
        }}
      ></div>

      {/* الدواير + النصوص */}
      <div className="flex justify-between items-center w-full z-10">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber <= currentStep;

          return (
            <div key={index} className="flex flex-col items-center">
              {/* الدائرة */}
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-bold transition-all duration-300
                ${isCompleted ? "bg-green-600" : "bg-gray-300"}`}
              >
                {stepNumber}
              </div>
              {/* النص */}
              <p className="mt-2 text-xs text-center w-20">{label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepProgress;
