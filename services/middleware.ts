import axios from "axios";

const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

// const baseURL = 'http://64.225.4.148:5000/api';
const baseURL = 'http://localhost:5000/api'
// const baseURL = 'https://backend.cydemic.com/api'
console.log("BASE URL ->", baseURL);

const api = axios.create({
  baseURL,
  withCredentials:true
  
});

api.interceptors.request.use(
  async (config) => {
    // config.headers.Authorization = `Bearer ${getAccessToken()}`;
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
//     if (error && error.status === 401) {
//       const {clearUser} = useUserStore()
//       console.log("interceptors Error ->",error.status)
//       const router = useRouter();
//       toast.error(`${
//         error?.response?.data?.data == 'Invalid Credentials!'
//         ? 'Invalid Credentials!'
//         : 'Session timed out'}`);
//         clearUser();
//         router.push("/")
//     } else {
//       return Promise.reject(error);
//     }
//   },
// );

export default api;