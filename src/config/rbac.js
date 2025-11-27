export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user'
};

export const PERMISSIONS = {
  // Usuarios
  USER_READ: 'user.read',
  USER_CREATE: 'user.create',
  USER_UPDATE: 'user.update',
  USER_DELETE: 'user.delete',
  
  // Categorías
  CATEGORY_READ: 'category.read',
  CATEGORY_CREATE: 'category.create',
  CATEGORY_UPDATE: 'category.update',
  CATEGORY_DELETE: 'category.delete',
  
  // Permisos especiales
  PERMISSION_MANAGE: 'permission.manage',
  ROLE_MANAGE: 'role.manage'
};

export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: Object.values(PERMISSIONS),
  [ROLES.MANAGER]: [
    PERMISSIONS.USER_READ,
    PERMISSIONS.CATEGORY_READ,
    PERMISSIONS.CATEGORY_CREATE,
    PERMISSIONS.CATEGORY_UPDATE
  ],
  [ROLES.USER]: [
    PERMISSIONS.CATEGORY_READ
  ]
};