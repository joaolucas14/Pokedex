import axios from "axios";

const http = axios.create({
  baseURL: "https://api-login-one.vercel.app/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use(
  function (config) {
    const token = sessionStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    console.log("Erro no interceptor do axios");
    return Promise.reject(error);
  }
);

export default http;

export const api = axios.create({
  baseURL: "https://api-login-one.vercel.app/",
});
