import { AUTH_TYPES } from '../types';
import { authApi } from '@/api/auth';

const state = {
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token')
};

const mutations = {
  [AUTH_TYPES.SET_USER](state, user) {
    state.user = user;
  },
  [AUTH_TYPES.SET_TOKEN](state, token) {
    state.token = token;
    state.isAuthenticated = !!token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  },
  [AUTH_TYPES.LOGOUT](state) {
    state.user = null;
    state.token = null;
    state.isAuthenticated = false;
    localStorage.removeItem('token');
  }
};

const actions = {
  async login({ commit, dispatch }, credentials) {
    try {
      const response = await authApi.login(credentials);
      const { token, user } = response.data;
      
      commit(AUTH_TYPES.SET_TOKEN, token);
      commit(AUTH_TYPES.SET_USER, user);
      
      // Cargar permisos mock automáticamente
      await dispatch('permissions/loadUserPermissions', null, { root: true });
      
      return response;
    } catch (error) {
      commit(AUTH_TYPES.LOGOUT);
      throw error;
    }
  },
  
  async checkAuth({ commit, state, dispatch }) {
    if (!state.token) return false;
    
    try {
      // Cargar permisos mock si está autenticado
      await dispatch('permissions/loadUserPermissions', null, { root: true });
      return true;
    } catch (error) {
      console.warn('Error checking auth:', error);
      return true; // Permitir acceso durante desarrollo
    }
  }
};

const getters = {
  user: (state) => state.user,
  isAuthenticated: (state) => state.isAuthenticated,
  userId: (state) => state.user?.id,
  userRoles: (state) => state.user?.roles || []
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};