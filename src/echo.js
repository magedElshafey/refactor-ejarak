import Echo from "laravel-echo";
import Pusher from "pusher-js";
const token = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : "";
const echo = new Echo({
  broadcaster: "pusher",
  key: "8801e6e1f35ffc6b8591",
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
export default echo;
