import { PERMISSION_TYPES } from '../../../store/types';
import { usersApi } from '@/api/users';

const state = {
  roles: [],
  permissions: [],
  userRoles: [],
  userDirectPermissions: [],
  inheritedPermissions: [],
  userAttributes: {},
  policies: []
};

const mutations = {
  [PERMISSION_TYPES.SET_ROLES](state, roles) {
    state.roles = roles;
  },
  [PERMISSION_TYPES.SET_PERMISSIONS](state, permissions) {
    state.permissions = permissions;
  },
  [PERMISSION_TYPES.SET_USER_ROLES](state, userRoles) {
    state.userRoles = userRoles;
  },
  [PERMISSION_TYPES.SET_USER_DIRECT_PERMISSIONS](state, directPermissions) {
    state.userDirectPermissions = directPermissions;
  },
  [PERMISSION_TYPES.SET_INHERITED_PERMISSIONS](state, inheritedPermissions) {
    state.inheritedPermissions = inheritedPermissions;
  },
  [PERMISSION_TYPES.SET_USER_ATTRIBUTES](state, attributes) {
    state.userAttributes = attributes;
  },
  [PERMISSION_TYPES.SET_POLICIES](state, policies) {
    state.policies = policies;
  }
};

const actions = {
  async loadUserPermissions({ commit, rootState }) {
    const userId = rootState.auth.user?.id;
    
    // Datos de ejemplo - simular permisos del usuario
    const mockPermissions = {
      roles: ['admin'],
      permissions: ['dashboard.access', 'user.read', 'user.create', 'user.update', 'user.delete', 'role.manage'],
      userRoles: [1],
      userDirectPermissions: [1, 2, 3, 4, 5, 6],
      inheritedPermissions: []
    };
    
    commit(PERMISSION_TYPES.SET_ROLES, mockPermissions.roles);
    commit(PERMISSION_TYPES.SET_PERMISSIONS, mockPermissions.permissions);
    commit(PERMISSION_TYPES.SET_USER_ROLES, mockPermissions.userRoles);
    commit(PERMISSION_TYPES.SET_USER_DIRECT_PERMISSIONS, mockPermissions.userDirectPermissions);
    commit(PERMISSION_TYPES.SET_INHERITED_PERMISSIONS, mockPermissions.inheritedPermissions);

    // console.log('Permisos cargados:', mockPermissions.permissions);
  },

  async assignUserRoles({ commit }, { userId, roles }) {
    const response = await usersApi.assignRoles(userId, roles);
    commit(PERMISSION_TYPES.SET_USER_ROLES, roles);
    return response;
  },

  async assignUserPermissions({ commit }, { userId, permissions }) {
    const response = await usersApi.assignPermissions(userId, permissions);
    commit(PERMISSION_TYPES.SET_USER_DIRECT_PERMISSIONS, permissions);
    return response;
  },

  async revokeUserPermission({ userId, permissionId }) {
    const response = await usersApi.revokePermission(userId, permissionId);
    return response;
  },

  clearPermissions({ commit }) {
    commit(PERMISSION_TYPES.SET_ROLES, []);
    commit(PERMISSION_TYPES.SET_PERMISSIONS, []);
    commit(PERMISSION_TYPES.SET_USER_ROLES, []);
    commit(PERMISSION_TYPES.SET_USER_DIRECT_PERMISSIONS, []);
    commit(PERMISSION_TYPES.SET_INHERITED_PERMISSIONS, []);
  }
};

const getters = {
  // Verificación RBAC básica
  hasPermission: (state) => (permission) => {
    const allUserPermissions = [
      ...state.userDirectPermissions,
      ...state.inheritedPermissions
    ];
    return allUserPermissions.includes(permission);
  },

  hasRole: (state) => (role) => {
    return state.userRoles.includes(role);
  },

  // Verificación híbrida RBAC + ABAC
  can: (state) => (action, resource, context = {}) => {
    // Primero verificar RBAC
    const rbacPermission = `${action}.${resource}`;
    const hasRBAC = getters.hasPermission(state)(rbacPermission);
    
    if (hasRBAC) {
      return true;
    }

    // Luego verificar ABAC si no hay permiso RBAC
    return getters.canABAC(state)(action, resource, context);
  },

  // Verificación ABAC
  canABAC: (state) => (action, resource, context = {}) => {
    return state.policies.some(policy => 
      policy.rules.every(rule => 
        matchesABACRule(rule, state.userAttributes, action, resource, context)
      )
    );
  },

  // Datos para componentes de gestión de permisos
  userPermissionsData: (state) => ({
    roles: state.roles,
    permissions: state.permissions,
    userRoles: state.userRoles,
    userDirectPermissions: state.userDirectPermissions,
    inheritedPermissions: state.inheritedPermissions
  })
};

// Función helper para ABAC
function matchesABACRule(rule, userAttributes, action, resource) {
  // Implementación básica - expandir según necesidades
  if (rule.user && rule.user.department) {
    if (rule.user.department !== userAttributes.department) {
      return false;
    }
  }

  if (rule.action && rule.action !== action) {
    return false;
  }

  if (rule.resource && rule.resource !== resource) {
    return false;
  }

  return true;
}

export default {
  namespaced: true,
  state: {
    permissions: [],
    roles: []
  },
  mutations,
  actions,
  getters
};