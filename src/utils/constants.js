export const APP_CONSTANTS = {
  ROUTES: {
    LOGIN: '/login',
    DASHBOARD: '/dashboard',
    USERS: '/admin/users',
    ROLES: '/admin/roles'
  },
  
  STORAGE_KEYS: {
    TOKEN: 'token',
    USER: 'user'
  },
  
  HTTP_STATUS: {
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404
  }
};

export const MESSAGES = {
  LOGIN_SUCCESS: 'Inicio de sesión exitoso',
  LOGOUT_SUCCESS: 'Sesión cerrada correctamente',
  UNAUTHORIZED: 'No autorizado',
  FORBIDDEN: 'Acceso denegado'
};