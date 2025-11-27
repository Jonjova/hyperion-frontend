import api from './index';

export const authApi = {
  login(credentials) {
    return api.post('/login', credentials);
  },
  
  logout() {
    return api.post('/logout');
  }
};