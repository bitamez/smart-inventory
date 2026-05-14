import api from './api';

export const reportService = {
  getDaily: () => api.get('/reports/daily').then(r => r.data.data),
  getMonthly: () => api.get('/reports/monthly').then(r => r.data.data),
  getStock: () => api.get('/reports/stock').then(r => r.data.data),
};

export default reportService;
