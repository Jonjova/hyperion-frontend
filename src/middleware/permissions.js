import store from '@/store';

export const permissionGuard = (to, from, next) => {
  const requiredPermission = to.meta?.permission;

  // No requiere permiso
  if (!requiredPermission) {
    return next();
  }

  // AuthGuard ya se encarga de login
  if (!store.state.auth.isAuthenticated) {
    return next();
  }

  // DEV → permitir
  if (process.env.NODE_ENV === 'development') {
    return next();
  }

  const hasPermission =
    store.getters['permissions/hasPermission'](requiredPermission);

  if (!hasPermission) {
    return next({ name: 'Dashboard' });
  }

  return next();
};