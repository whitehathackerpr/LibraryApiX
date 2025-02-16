// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api',
});

// Request interceptor: attach the JWT token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle specific status codes here
    if (error.response) {
      if (error.response.status === 401) {
        // Optionally, redirect to login or clear tokens
        console.error('Unauthorized, please log in again.');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
