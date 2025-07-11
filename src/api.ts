// src/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: "https://localhost:7272/api",
});
// Intercept 401 responses and redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized. Redirecting to login...');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
