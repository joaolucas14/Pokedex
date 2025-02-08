import axios from "axios";

const http = axios.create({
  baseURL:
    "https://railway.com/project/9e2c814a-d283-456e-8234-7d983ef9affa/service/2bea3c03-1214-499d-87a9-5711ab39b795?environmentId=110934cc-99d9-4012-a83a-119018e222ae&id=84f289a7-43e7-4ca4-b22e-5810de981d89#details",
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
  baseURL:
    "https://railway.com/project/9e2c814a-d283-456e-8234-7d983ef9affa/service/2bea3c03-1214-499d-87a9-5711ab39b795?environmentId=110934cc-99d9-4012-a83a-119018e222ae&id=84f289a7-43e7-4ca4-b22e-5810de981d89#details",
});
