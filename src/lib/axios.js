import axios from 'axios';

// Always use relative path - Netlify redirects /api/* to backend
const baseURL = '/api';

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