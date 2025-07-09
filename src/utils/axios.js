import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_EXPRESS_BASE_URL+"/api",
  withCredentials: true,
});

export default API;