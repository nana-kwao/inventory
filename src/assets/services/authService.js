import axios from "axios";

// Base API URL
const API_BASE_URL =
  "https://inventory-server-tmqz.onrender.com:10000/api/auth";

// Create axios instance with default config
const authAPI = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor to add auth token to headers
authAPI.interceptors.request.use(
  (config) => {
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
authAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized - try to refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh token
        await authAPI.refreshToken();
        // Retry the original request
        return authAPI(originalRequest);
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

export default authAPI;
