import axios from 'axios';

// Use environment variable in production, relative path in dev (proxied)
const baseURL = import.meta.env.VITE_API_URL || '/api';

export const api = axios.create({
  baseURL,
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