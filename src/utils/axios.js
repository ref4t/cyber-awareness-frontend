import axios from "axios";

const API = axios.create({
  baseURL: "https://cybersecurityawareness.onrender.com/api",  // <- use import.meta.env
  withCredentials: true,
});

export default API;
