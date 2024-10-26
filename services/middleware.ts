import axios from "axios";

const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

const baseURL = 'http://localhost:5000/api';

console.log("BASE URL ->",baseURL);

const api = axios.create({
  baseURL
});

api.interceptors.request.use(
  async (config) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;