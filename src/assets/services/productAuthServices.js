import axios from "axios";
import getNewToken from "./tokenService";

// Base API URL
const API_BASE_URL = "/api/dashboard";

//access token
const accesstoken = sessionStorage.getItem("accesstoken");

// Create axios instance with default config
const productAuthAPI = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor to add auth token to headers
productAuthAPI.interceptors.request.use(
  (config) => {
    //add access token to request
    config.headers.Authorization = `Bearer ${accesstoken}`;

    // Add timestamp to prevent caching
    config.headers["X-Request-Time"] = Date.now();

    // Optional: Add CSRF token if you're using it
    const csrfToken = document.querySelector(
      'meta[name="csrf-token"]'
    )?.content;
    if (csrfToken) {
      config.headers["X-CSRF-Token"] = csrfToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh and errors
productAuthAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized - try to refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        let newAccessToken;
        const res = await getNewToken();
        if (res.success === true) {
          newAccessToken = sessionStorage.getItem("accesstoken");
        }
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // Retry the original request with the new token
        return axios(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    // Handle rate limiting
    if (error.response?.status === 429) {
      const retryAfter = error.response.headers["retry-after"];
      if (retryAfter) {
        console.warn(`Rate limited. Retry after ${retryAfter} seconds`);
      }
    }

    // Handle network errors
    if (!error.response) {
      console.error("Network error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default productAuthAPI;
