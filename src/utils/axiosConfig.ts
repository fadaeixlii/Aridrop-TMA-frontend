import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

// Create an instance of axios
const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://api.opalifi.biten.ir/", // Replace with your API base URL
  // baseURL: "http://localhost:7001/", // Replace with your API base URL
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
  (config: InternalAxiosRequestConfig) => {
    // Do something before the request is sent, e.g., add authentication token
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error: AxiosError) => {
    // Do something with the request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  (error: AxiosError) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

// Define methods for GET, POST, DELETE
const api = {
  get: (url: string, config?: AxiosRequestConfig) =>
    axiosInstance.get(url, config),
  post: (url: string, data?: any, config?: AxiosRequestConfig) =>
    axiosInstance.post(url, data, config),
  delete: (url: string, config?: AxiosRequestConfig) =>
    axiosInstance.delete(url, config),
};

export default api;
