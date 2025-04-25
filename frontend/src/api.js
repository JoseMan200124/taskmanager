import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:4000' });

export const getTree      = ()      => api.get('/tasks').then(r=>r.data);
export const addTask      = d       => api.post('/tasks', d).then(r=>r.data);
export const startTask    = id      => api.patch(`/tasks/${id}/start`);
export const completeTask = id      => api.patch(`/tasks/${id}/complete`);
