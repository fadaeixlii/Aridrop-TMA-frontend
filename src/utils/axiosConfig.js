import axios from "axios";

// Create an instance of axios
const axiosInstance = axios.create({
    // baseURL: "https://api.airdrop.tma.biten.ir/", // Replace with your API base URL
    baseURL: "http://localhost:7001/", // Replace with your API base URL
    timeout: 10000, // Set a timeout limit
    headers: {
        "Content-Type": "application/json",
        // Add any custom headers if needed
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Do something before the request is sent, e.g., add authentication token
        // config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        // Do something with the request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    }
);

// Define methods for GET, POST, DELETE
const api = {
    get: (url, config = {}) => axiosInstance.get(url, config),
    post: (url, data, config = {}) => axiosInstance.post(url, data, config),
    delete: (url, config = {}) => axiosInstance.delete(url, config),
};

export default api;