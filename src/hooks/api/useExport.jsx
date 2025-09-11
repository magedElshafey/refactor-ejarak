import { request } from "../../services/axios";

export const useExport = () => {
  const handleExport = async ({ url, fileName, type }) => {
    const response = await request({
      url,
      method: "GET",
      responseType: "blob",
    });

    const mimeType =
      type === "excel"
        ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        : "application/pdf";

    const blob = new Blob([response], { type: mimeType });
    const downloadUrl = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `${fileName}.${type === "excel" ? "xlsx" : "pdf"}`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(downloadUrl);
    document.body.removeChild(a);
  };

  return { handleExport };
};
