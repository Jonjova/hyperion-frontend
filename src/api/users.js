import api from './index';

export const usersApi = {
  getUsers() {
    return api.get('/users');
  },
  
  getUser(id) {
    return api.get(`/users/${id}`);
  },
  
  createUser(userData) {
    return api.post('/users', userData);
  },
  
  updateUser(id, userData) {
    return api.put(`/users/${id}`, userData);
  },
  
  deleteUser(id) {
    return api.delete(`/users/${id}`);
  },
  
  getUserPermissions(userId) {
    return api.get(`/users/${userId}/permissions`);
  },
  
  assignPermissions(userId, directPermissions) {
    return api.post(`/users/${userId}/permissions`, {
      direct_permissions: directPermissions
    });
  },
  
  assignRoles(userId, roles) {
    return api.post(`/users/${userId}/roles`, { roles });
  },
  
  revokePermission(userId, permissionId) {
    return api.delete(`/users/${userId}/permissions/${permissionId}`);
  },
  
  getRolePermissions(userId, roleId) {
    return api.get(`/users/${userId}/roles/${roleId}/permissions`);
  },
  
  updateRolePermissions(userId, roleId, permissions) {
    return api.put(`/users/${userId}/roles/${roleId}/permissions`, {
      permissions
    });
  }
};