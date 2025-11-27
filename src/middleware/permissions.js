import store from '@/store';

export const permissionGuard = (to, from, next) => {
  const requiredPermission = to.meta?.permission;
  
  // Si no requiere permiso, continuar
  if (!requiredPermission) {
    return next();
  }
  
  // Si no está autenticado, ir a login
  if (!store.state.auth.isAuthenticated) {
    return next({ name: 'Login' });
  }
  
  // TEMPORAL: Permitir acceso durante desarrollo
  if (process.env.NODE_ENV === 'development') {
    console.warn(`[DEV] Permiso requerido: ${requiredPermission} - Acceso permitido temporalmente`);
    return next();
  }
  
  // En producción, verificar permisos
  const hasPermission = store.getters['permissions/hasPermission'](requiredPermission);
  
  if (!hasPermission) {
    console.error(`No tienes permiso para: ${requiredPermission}`);
    // Redirigir a dashboard en lugar de crear bucle
    return next({ name: 'Dashboard' });
  }
  
  next();
};