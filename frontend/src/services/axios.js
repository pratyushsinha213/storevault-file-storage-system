import axios from "axios";

// Debug: Log the API URL being used
// console.log("API Base URL:", import.meta.env.VITE_API_BASE_URL || "http://localhost:5500/api/v1");

const axiosInstance = new axios.create({
    baseURL: "https://storevault-backend-production.up.railway.app/api/v1", // Temporary hardcode for testing
    withCredentials: true,
})

export default axiosInstance;