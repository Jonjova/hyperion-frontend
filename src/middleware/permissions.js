import store from '@/store';

export const permissionGuard = (to, from, next) => {
  // 🔴 IMPORTANTE: si no requiere auth, no hacer nada
  if (!to.meta.requiresAuth) {
    return next();
  }

  // 🔴 Si no está autenticado, authGuard ya se encarga
  if (!store.state.auth.isAuthenticated) {
    return next();
  }

  const requiredPermission = to.meta.permission;
// console.log('Required Permission:', requiredPermission);
  // No requiere permiso
  if (!requiredPermission) {
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

  next();
};