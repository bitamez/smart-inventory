import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optionally add interceptors here to inject tokens later
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('supabase_token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export const productService = {
  getAll: () => api.get('/products').then(res => res.data.data),
  getById: (id) => api.get(`/products/${id}`).then(res => res.data.data),
  create: (data) => api.post('/products', data).then(res => res.data.data),
  update: (id, data) => api.put(`/products/${id}`, data).then(res => res.data.data),
  delete: (id) => api.delete(`/products/${id}`).then(res => res.data.data),
};

export const salesService = {
  getAll: () => api.get('/sales').then(res => res.data.data),
  create: (data) => api.post('/sales', data).then(res => res.data.data),
};

export const stockService = {
  getAll: () => api.get('/stock').then(res => res.data.data),
  add: (data) => api.post('/stock', data).then(res => res.data.data),
};

export const approvalService = {
  getAll: () => api.get('/approvals').then(res => res.data.data),
  process: (id, data) => api.put(`/approvals/${id}/process`, data).then(res => res.data.data),
};

export const reportService = {
  getDaily: () => api.get('/reports/daily').then(res => res.data.data),
  getMonthly: () => api.get('/reports/monthly').then(res => res.data.data),
  getStock: () => api.get('/reports/stock').then(res => res.data.data),
};

export default api;
