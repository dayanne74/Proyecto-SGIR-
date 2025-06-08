// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:7700/api',
});

// Inyecta token en cada petición
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Si recibes 401, limpias storage y vas al login
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('roles');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;