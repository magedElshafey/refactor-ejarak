// import { useState } from "react";
// import { FaFileExport } from "react-icons/fa";
// import { useExport } from "../../hooks/api/useExport";

// const ExportButton = ({ excelEndpoint, pdfEndpoint, fileName }) => {
//   const { handleExport } = useExport();
//   const [open, setOpen] = useState(false);

//   const handleClick = (url, type) => {
//     handleExport({ url, fileName, type });
//     setOpen(false);
//   };

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setOpen((prev) => !prev)}
//         className="w-10 h-10 flex items-center justify-center border bg-white text-maincolorgreen hover:bg-gray-100 rounded-md"
//       >
//         <FaFileExport size={20} />
//       </button>

//       {open && (
//         <div className="absolute right-0 top-full mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
//           {excelEndpoint && (
//             <button
//               onClick={() => handleClick(excelEndpoint, "excel")}
//               className="w-full text-left px-4 py-2 hover:bg-gray-100"
//             >
//               Export as Excel
//             </button>
//           )}
//           {pdfEndpoint && (
//             <button
//               onClick={() => handleClick(pdfEndpoint, "pdf")}
//               className="w-full text-left px-4 py-2 hover:bg-gray-100"
//             >
//               Export as PDF
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExportButton;
import { useState, useRef, useEffect } from "react";
import { FaFileExport } from "react-icons/fa";
import { useExport } from "../../hooks/api/useExport";
import { useTranslation } from "react-i18next";
const ExportButton = ({ excelEndpoint, pdfEndpoint, fileName }) => {
  const { t } = useTranslation();
  const { handleExport } = useExport();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClick = (url, type) => {
    handleExport({ url, fileName, type });
    setOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-10 h-10 flex items-center justify-center border bg-white text-maincolorgreen hover:bg-gray-100 rounded-md"
      >
        <FaFileExport size={20} />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-2 w-48  bg-white border rounded-md shadow-lg z-10">
          {excelEndpoint && (
            <button
              onClick={() => handleClick(excelEndpoint, "excel")}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              {t("Export as Excel")}
            </button>
          )}
          {pdfEndpoint && (
            <button
              onClick={() => handleClick(pdfEndpoint, "pdf")}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              {t("Export as PDF")}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ExportButton;
