import store from '@/store';

export const PermissionMixin = {
  methods: {
    $can(permission) {
      return store.getters['permissions/hasPermission'](permission);
    },
    
    $hasRole(role) {
      return store.getters['permissions/hasRole'](role);
    },
    
    $canPerform(action, resource, context = {}) {
      return store.getters['permissions/can'](action, resource, context);
    },
    
    $getUserPermissionsData() {
      return store.getters['permissions/userPermissionsData'];
    }
  }
};

export const formatPermissionName = (permission) => {
  const parts = permission.split('.');
  return parts.map(part => 
    part.charAt(0).toUpperCase() + part.slice(1)
  ).join(' ');
};

export const groupPermissionsByResource = (permissions) => {
  const grouped = {};
  
  permissions.forEach(permission => {
    const [resource, action] = permission.name.split('.');
    if (!grouped[resource]) {
      grouped[resource] = [];
    }
    grouped[resource].push({
      id: permission.id,
      action,
      fullName: permission.name,
      displayName: formatPermissionName(permission.name)
    });
  });
  
  return grouped;
};