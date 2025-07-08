import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,  // <- use import.meta.env
  withCredentials: true,
});

export default API;