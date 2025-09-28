// import { request } from "../../services/axios";

// export const useExport = () => {
//   const handleExport = async ({ url, fileName, type }) => {
//     const response = await request({
//       url,
//       method: "GET",
//       responseType: "blob",
//     });

//     const mimeType =
//       type === "excel"
//         ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//         : "application/pdf";

//     const blob = new Blob([response], { type: mimeType });
//     const downloadUrl = window.URL.createObjectURL(blob);

//     const a = document.createElement("a");
//     a.href = downloadUrl;
//     a.download = `${fileName}.${type === "excel" ? "xlsx" : "pdf"}`;
//     document.body.appendChild(a);
//     a.click();
//     window.URL.revokeObjectURL(downloadUrl);
//     document.body.removeChild(a);
//   };

//   return { handleExport };
// };
// import { request } from "../../services/axios";

// export const useExport = () => {
//   const handleExport = async ({ url, fileName, type }) => {
//     try {
//       // 1- استدعاء API الأساسي عشان يجيب JSON فيه رابط الملف
//       const metaResponse = await request({
//         url,
//         method: "GET",
//       });
//       console.log("metaResponse", metaResponse);
//       // 2- استخراج رابط التحميل
//       const downloadUrlFromApi = metaResponse.data.download_url;
//       console.log("downloadUrlFromApi", downloadUrlFromApi);
//       if (!downloadUrlFromApi) {
//         throw new Error("Download URL not found in response");
//       }

//       // 3- استدعاء الرابط الفعلي للملف كـ blob
//       const fileResponse = await request({
//         url: downloadUrlFromApi,
//         method: "GET",
//         responseType: "blob",
//       });

//       const mimeType =
//         type === "excel"
//           ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//           : "application/pdf";

//       // 4- إنشاء blob من الملف نفسه
//       const blob = new Blob([fileResponse.data], { type: mimeType });
//       const downloadUrl = window.URL.createObjectURL(blob);

//       // 5- إنشاء لينك وتنزيل الملف
//       const a = document.createElement("a");
//       a.href = downloadUrl;
//       a.download = `${fileName}.${type === "excel" ? "xlsx" : "pdf"}`;
//       document.body.appendChild(a);
//       a.click();

//       // 6- تنظيف
//       window.URL.revokeObjectURL(downloadUrl);
//       document.body.removeChild(a);
//     } catch (error) {
//       console.error("Export error:", error);
//     }
//   };

//   return { handleExport };
// };
import { request } from "../../services/axios";

export const useExport = () => {
  const handleExport = async ({ url, fileName, type }) => {
    try {
      // 1- استدعاء API الأساسي عشان يجيب JSON فيه رابط الملف
      const metaResponse = await request({
        url,
        method: "GET",
      });

      // 2- استخراج رابط التحميل
      const downloadUrlFromApi = metaResponse.data.download_url;
      if (!downloadUrlFromApi) {
        throw new Error("Download URL not found in response");
      }

      // 3- تنزيل الملف مباشرة باستخدام الرابط
      const a = document.createElement("a");
      a.href = downloadUrlFromApi;

      // هنا بنحدد اسم الملف اللي المستخدم هينزله
      a.download = `${fileName}.${type === "excel" ? "xlsx" : "pdf"}`;

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Export error:", error);
    }
  };

  return { handleExport };
};
