import api from './api';

export const stockService = {
  getAll: () => api.get('/stock').then(r => r.data.data),
  addStock: (data) => api.post('/stock', data).then(r => r.data.data),
};

export default stockService;
