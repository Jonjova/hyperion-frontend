// src/plugins/auth.js
import store from '@/store';

export default {
  install(Vue) {
    // Métodos de permisos
    const authMethods = {
      // RBAC
      hasRole(role) {
        return store.getters['permissions/hasRole'](role);
      },
      
      hasPermission(permission) {
        return store.getters['permissions/hasPermission'](permission);
      },
      
      // ABAC
      checkPolicy(resource, action, context) {
        return store.getters['permissions/can'](action, resource, context);
      },
      
      // Método unificado - ESTE ES $can
      can(permission, resource, context = {}) {
        if (typeof permission === 'string') {
          return this.hasPermission(permission);
        }
        return this.checkPolicy(resource || permission.resource, permission.action, context);
      },
      
      // Estado de autenticación
      get user() {
        return store.getters['auth/user'];
      },
      
      get isAuthenticated() {
        return store.getters['auth/isAuthenticated'];
      },
      
      // Métodos adicionales
      get userId() {
        return store.getters['auth/userId'];
      },
      
      get userRoles() {
        return store.getters['auth/userRoles'];
      },
      
      async logout() {
        await store.dispatch('auth/logout');
      },
      
      async initialize() {
        return await store.dispatch('auth/initialize');
      }
    };
    
    // Agregar todos los métodos a Vue.prototype
    Vue.prototype.$auth = authMethods;
    
    // También agregar $can como atajo directo
    Vue.prototype.$can = function(permission, resource, context) {
      return authMethods.can(permission, resource, context);
    };
    
    // O si prefieres, agrega todos los métodos individualmente
    Vue.prototype.$hasRole = authMethods.hasRole;
    Vue.prototype.$hasPermission = authMethods.hasPermission;
    Vue.prototype.$checkPolicy = authMethods.checkPolicy;
  }
};