import axios from "axios";
// import { toast } from "sonner";
// import { useUserStore } from "@/store/user.store";

const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

const baseURL = 'http://localhost:5000/api';
console.log("BASE URL ->", baseURL);

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

// api.interceptors.response.use(
//   response => {
//     return response;
//   },
//   async error => {
//     if (error.response && error.response?.status === 401) {
//       const { clearUser } = useUserStore()
//       toast.error(error.response.message.data);
//       clearUser()
//     } else {
//       return Promise.reject(error);
//     }
//   },
// );

export default api;