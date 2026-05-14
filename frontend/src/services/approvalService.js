import api from './api';

export const approvalService = {
  getAll: () => api.get('/approvals').then(r => r.data.data),
  process: (id, data) => api.put(`/approvals/${id}/process`, data).then(r => r.data.data),
};

export default approvalService;
