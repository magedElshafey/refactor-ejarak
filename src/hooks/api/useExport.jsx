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
