import axios from 'axios';
import runtimeConfig from '../config/runtime-config';

// Create axios instance without baseURL - it will be set dynamically in interceptor
const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

// Set baseURL from runtime config in interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    // Set baseURL from runtime config
    if (!config.baseURL) {
      config.baseURL = runtimeConfig.API_URL;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
