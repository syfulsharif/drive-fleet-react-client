import axios from 'axios';

// Use environment variable in production, relative path in dev (proxied)
const baseURL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || '/api';

export const api = axios.create({
  baseURL: baseURL.replace(/\/$/, ''), // Remove trailing slash to avoid double slashes
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle network errors gracefully
    if (!error.response) {
      console.error('Network error - check your connection');
    }
    return Promise.reject(error);
  }
);