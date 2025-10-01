import api from './api';

export const fetchUsers = (params) => api.get('/users', { params });
export const fetchUserById = (id) => api.get(`/users/${id}`);
export const createUser = (payload) => api.post('/users', payload);
export const updateUser = (id, payload) => api.put(`/users/${id}`, payload);
export const deleteUser = (id) => api.delete(`/users/${id}`);
export const exportCSV = (params) => {
  const url = `${api.defaults.baseURL}/users/export${params && params.search ? '?search=' + encodeURIComponent(params.search) : ''}`;
  return url; // we'll open this URL to trigger download
};
