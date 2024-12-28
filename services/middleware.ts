import axios from "axios";
import { toast } from "sonner";
import { deleteCookie } from "cookies-next";

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

// const baseURL = 'http://64.225.4.148:5000/api';
const baseURL = "http://localhost:5000/api";
// const baseURL = "https://backend.cydemic.com/api";
console.log("BASE URL ->", baseURL);

const api = axios.create({
  baseURL,
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = `Bearer ${getAccessToken()}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     if (error.response && error.response?.status === 401) {
//       toast(
//         error?.response?.data?.data == "Invalid Credentials!" || error?.response?.data?.data == "Invalid email or password"
//           ? "Invalid Credentials!"
//           : " Session timed out",
//       );
//       localStorage.clear();
//       deleteCookie("accessToken");
//       window.location.href = "/login";
//     } else {
//       return Promise.reject(error);
//     }
//   },
// );

export default api;
