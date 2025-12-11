// src/api/auth.js
import axios from './index';

export const authApi = {
  login(credentials) {
    return axios.post('/login', credentials);
  },
  
  logout() {
    return axios.post('/logout');
  },
  
  getProfile() {
    return axios.get('/auth/profile');
  },
  
  verifyToken(token) {
    return axios.post('/auth/verify', { token });
  },
  
  refreshToken(refreshToken) {
    return axios.post('/auth/refresh', { refreshToken });
  }
};