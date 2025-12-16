// src/modules/auth/auth.js
import { AUTH_TYPES } from '@/store/types';
import { authApi } from '@/api/auth';

const state = {
  user: JSON.parse(localStorage.getItem('user')) || null,  // ← Cargar de localStorage
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token')
};

const mutations = {
  [AUTH_TYPES.SET_USER](state, user) {
    state.user = user;
    // Guardar en localStorage
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  },
  
  [AUTH_TYPES.SET_TOKEN](state, token) {
    state.token = token;
    state.isAuthenticated = !!token; // ✅ CORRECTO
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },
  
  [AUTH_TYPES.LOGOUT](state) {
    state.user = null;
    state.token = null;
    state.isAuthenticated = false;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Limpiar permisos si los guardas
    localStorage.removeItem('permissions');
  }
};

const actions = {
  async login({ commit, dispatch }, credentials) {
    try {
      console.log('Iniciando login con:', credentials);
      
      const response = await authApi.login(credentials);
      const { token, user } = response.data;
      
      console.log('Login exitoso:', { token, user });
      
      commit(AUTH_TYPES.SET_TOKEN, token);
      commit(AUTH_TYPES.SET_USER, user);
      
      // Debug: verificar localStorage
      console.log('Token en localStorage:', localStorage.getItem('token'));
      console.log('User en localStorage:', localStorage.getItem('user'));
      
      // Cargar permisos
      if (user && user.id) {
        await dispatch('permissions/loadUserPermissions', user.id, { root: true });
      }
      
      return response;
    } catch (error) {
      console.error('Error en login:', error);
      commit(AUTH_TYPES.LOGOUT);
      throw error;
    }
  },
  
  // NUEVA: Inicializar autenticación al cargar la app
  async initialize({ commit, state, dispatch }) {
    console.log('Inicializando autenticación...');
    
    // Si no hay token, no hacer nada
    if (!state.token) {
      console.log('No hay token, usuario no autenticado');
      return false;
    }
    
    try {
      // Si ya tenemos usuario en localStorage, usarlo
      if (state.user) {
        console.log('Usuario cargado desde localStorage:', state.user);
        // Cargar permisos para este usuario
        await dispatch('permissions/loadUserPermissions', state.user.id, { root: true });
        return true;
      }
      
      // Si no hay usuario pero sí token, obtener del backend
      console.log('Obteniendo perfil desde API...');
      const response = await authApi.getProfile();
      commit(AUTH_TYPES.SET_USER, response.data);
      
      // Cargar permisos
      await dispatch('permissions/loadUserPermissions', response.data.id, { root: true });
      
      return true;
    } catch (error) {
      console.error('Error inicializando autenticación:', error);
      
      // Si el token es inválido (401), limpiar
      if (error.response && error.response.status === 401) {
        console.log('Token inválido, limpiando...');
        commit(AUTH_TYPES.LOGOUT);
      }
      
      return false;
    }
  },
  
  // NUEVA: Acción de logout
  async logout({ commit, dispatch }) {
    try {
      // Si tienes endpoint de logout
      if (state.token) {
        await authApi.logout();
      }
    } catch (error) {
      console.warn('Error en logout API:', error);
    } finally {
      commit(AUTH_TYPES.LOGOUT);
      // Limpiar permisos
      dispatch('permissions/clearPermissions', null, { root: true });
    }
  },
  
  async checkAuth({ state }) {
    // Verificación simple
    return !!state.token;
  }
};

const getters = {
  user: (state) => state.user,
  isAuthenticated: (state) => state.isAuthenticated,
  userId: (state) => state.user?.id,
  userRoles: (state) => state.user?.roles || [],
  userName: (state) => state.user?.name || state.user?.username || 'Usuario'
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};