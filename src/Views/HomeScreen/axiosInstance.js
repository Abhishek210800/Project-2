// src/Views/HomeScreen/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  // Do not set baseURL—this lets the proxy (from package.json) forward relative URLs.
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
});

export default axiosInstance;
