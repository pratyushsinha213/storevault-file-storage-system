import axios from "axios";

const axiosInstance = new axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5500/api/v1",
    withCredentials: true,
})

export default axiosInstance;