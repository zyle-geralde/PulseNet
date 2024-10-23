import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL //allows us to use the VITE_API_URL in the .env as our base URL
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);// gets access token in localStorage
    if (token) { // checks if token is available
      config.headers.Authorization = `Bearer ${token}`;// updates the Authorization header with the token to be used in authentication by django
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;