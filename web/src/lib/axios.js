import axios from "axios";

const api = axios.create({
  baseURL: "https://wavechat-app.onrender.com/api",
  withCredentials: true,
});

export default api;
