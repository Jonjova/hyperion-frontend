import store from '@/store';

export const authGuard = (to, from, next) => {
  // Si la ruta no requiere auth, continuar
  if (!to.meta.requiresAuth) {
    return next();
  }
  
  // Si está autenticado, continuar
  if (store.state.auth.isAuthenticated) {
    return next();
  }
  
  // Si no está autenticado y va a una ruta protegida, redirigir a login
  next({ name: 'Login' });
};