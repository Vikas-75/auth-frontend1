// api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/", // Correct baseURL
});
export default API;
