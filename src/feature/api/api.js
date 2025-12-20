import axios from "axios";

const API = axios.create({
  baseURL: "https://price-tracker-backend-1.onrender.com" // your backend server
});

export default API;
