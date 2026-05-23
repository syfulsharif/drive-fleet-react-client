import axios from 'axios';

// In dev: Vite proxy handles /api -> localhost:3000
// In production: use full backend URL directly
const isDev = import.meta.env.DEV;
const baseURL = isDev
  ? '/api'
  : 'https://drivefleet-backend-23052026.vercel.app/api';

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
);// Optimized imports
// Environment config
// API timeout
// Request headers
// CORS setup
// Response handling
// Error logging
// Build ready
