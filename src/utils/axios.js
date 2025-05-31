import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, // this ensures cookies (JWT) are included
});

export default API;
