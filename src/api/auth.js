import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000/api/auth', // Your Node.js auth service
});

// Add JWT to headers if exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const signup = (data) => API.post('/signup', data);
export const login = (data) => API.post('/login', data);
export const getProfile = () => API.get('/profile');
