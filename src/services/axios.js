import axios from "axios";

const lang = localStorage.getItem("lang")
  ? JSON.parse(localStorage.getItem("lang"))
  : "ar";
const authToken = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : "238|R95WJDNOBCvX9cgKCFpgpAKQwhLTzYRJtfYzE6Ypba82bea2";
const client = axios.create({
  baseURL: "https://api.ejark.sa/api/v1",
  headers: {
    "Content-Type": "application/json",
    lang,
    "Accept-Language": lang,
    "Access-Control-Allow-Credentials": true,
    "x-api-key": "0FcBOe75FIFkBkNkA",
    Authorization: authToken ? `Bearer ${authToken}` : null,
  },
});
export const request = ({ ...options }) => {
  const onSuccess = (response) => {
    return response;
  };
  const onError = (error) => {
    return error;
  };

  return client(options).then(onSuccess).catch(onError);
};
