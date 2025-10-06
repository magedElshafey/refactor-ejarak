import { request } from "../../services/axios";

export const useExport = () => {
  const handleExport = async ({ url, fileName, type }) => {
    try {
      const metaResponse = await request({
        url,
        method: "GET",
      });

      const downloadUrlFromApi = metaResponse.data.download_url;
      if (!downloadUrlFromApi) {
        throw new Error("Download URL not found in response");
      }

      const a = document.createElement("a");
      a.href = downloadUrlFromApi;

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
