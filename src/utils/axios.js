import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true, // this ensures cookies (JWT) are included
});

export default API;
