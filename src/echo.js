import Echo from "laravel-echo";
const token = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : "";
const echo = new Echo({
  broadcaster: "pusher",
  key: "69a780a14544bf6a150b",
  cluster: "eu",
  forceTLS: false,
  authEndpoint: `https://api.ejark.sa/api/broadcasting/auth`,
  auth: {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  },
});
