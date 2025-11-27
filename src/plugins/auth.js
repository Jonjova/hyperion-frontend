import store from '@/store';

export default {
  install(Vue) {
    Vue.prototype.$auth = {
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
      
      // Híbrido
      can(permission, resource, context = {}) {
        if (typeof permission === 'string') {
          return this.hasPermission(permission);
        }
        return this.checkPolicy(resource || permission.resource, permission.action, context);
      },
      
      // Estado de autenticación
      get user() {
        return store.state.auth.user;
      },
      
      get isAuthenticated() {
        return store.state.auth.isAuthenticated;
      }
    };
  }
};